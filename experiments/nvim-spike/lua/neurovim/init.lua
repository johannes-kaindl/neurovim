-- Spike: NeuroVim as a Neovim plugin. Neovim draws everything it already has (buffers,
-- floats, the colorscheme, the statusline); this file only adds what it lacks: the
-- mission, its objective and the check. The game logic stays in the core, run as a
-- Node process (sidecar.ts) over newline-delimited JSON on stdin/stdout.
local M = {}

local ns = vim.api.nvim_create_namespace('neurovim')
local ns_diff = vim.api.nvim_create_namespace('neurovim.diff')
local root = vim.fn.fnamemodify(debug.getinfo(1, 'S').source:sub(2), ':h:h:h')
local job, seq, pending, partial = nil, 0, {}, ''

local function on_stdout(_, data)
  -- Neovim hands over chunks split on newlines; the last element may be a partial line.
  data[1] = partial .. data[1]
  partial = data[#data]
  for i = 1, #data - 1 do
    if data[i] ~= '' then
      local msg = vim.json.decode(data[i])
      local cb = pending[msg.id]
      pending[msg.id] = nil
      if cb then cb(msg) end
    end
  end
end

function M.start()
  if job then return end
  job = vim.fn.jobstart({ 'node', root .. '/dist/sidecar.mjs' }, { on_stdout = on_stdout })
  if job <= 0 then error('neurovim: could not start node sidecar') end
end

function M.request(req, cb)
  M.start()
  seq = seq + 1
  req.id = seq
  pending[seq] = cb
  vim.fn.chansend(job, vim.json.encode(req) .. '\n')
end

function M.request_sync(req, timeout)
  local res
  M.request(req, function(msg) res = msg end)
  vim.wait(timeout or 5000, function() return res ~= nil end, 5)
  if not res then error('neurovim: sidecar timed out on ' .. req.cmd) end
  if not res.ok then error('neurovim: ' .. res.error) end
  return res
end

-- Open a mission as a plain scratch buffer. The objective sits above line 1 as virtual
-- lines: always visible, never part of the text that gets scored.
function M.open(id)
  local m = M.request_sync({ cmd = 'get', mission = id }).mission
  -- Opening a mission again restarts it from the corrupted text.
  local name = 'neurovim://' .. m.id
  local old = vim.fn.bufnr(name)
  if old ~= -1 then vim.api.nvim_buf_delete(old, { force = true }) end
  local buf = vim.api.nvim_create_buf(true, true)
  vim.api.nvim_buf_set_name(buf, name)
  vim.api.nvim_buf_set_lines(buf, 0, -1, false, vim.split(m.transmission, '\n', { plain = true }))
  vim.bo[buf].filetype = 'markdown'
  vim.b[buf].neurovim_mission = m.id
  local virt = { { { m.id .. ' — ' .. m.title, 'Title' } } }
  for _, step in ipairs(m.objective) do
    table.insert(virt, { { '  ▸ ' .. step, 'Comment' } })
  end
  vim.api.nvim_buf_set_extmark(buf, ns, 0, 0, { virt_lines = virt, virt_lines_above = true })
  vim.api.nvim_set_current_buf(buf)
  return buf, m
end

function M.check(buf)
  buf = buf or vim.api.nvim_get_current_buf()
  local id = vim.b[buf].neurovim_mission
  if not id then error('neurovim: not a mission buffer') end
  local text = table.concat(vim.api.nvim_buf_get_lines(buf, 0, -1, false), '\n')
  local res = M.request_sync({ cmd = 'verify', mission = id, text = text })
  vim.api.nvim_buf_clear_namespace(buf, ns_diff, 0, -1)
  local last = vim.api.nvim_buf_line_count(buf) - 1
  for _, line in ipairs(res.divergent) do
    -- A missing line lies past the end of the buffer; mark the last one instead.
    vim.api.nvim_buf_set_extmark(buf, ns_diff, math.min(line, last), 0, { line_hl_group = 'DiffChange' })
  end
  return res.result
end

function M.setup()
  vim.api.nvim_create_user_command('NeuroVim', function(opts)
    if opts.args ~= '' then return M.open(opts.args) end
    local list = M.request_sync({ cmd = 'list' }).missions
    vim.ui.select(list, {
      prompt = 'CIPHER // select mission',
      format_item = function(m) return m.id .. '  ' .. m.title end,
    }, function(m) if m then M.open(m.id) end end)
  end, { nargs = '?' })
  vim.api.nvim_create_user_command('NeuroVimCheck', function()
    local r = M.check()
    if r.matches then
      vim.notify('TRANSMISSION RESTORED', vim.log.levels.INFO)
    else
      vim.notify(('%d line(s) still corrupted'):format(r.lines_off), vim.log.levels.WARN)
    end
  end, {})
end

return M
