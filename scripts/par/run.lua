-- Plays key sequences in neurovim.nvim and counts them the way a player's keys count
-- (:help neurovim-keys). Run by scripts/par/par.mjs against a throwaway copy of the plugin.
-- usage: nvim --headless -u NONE -l run.lua <plugin_dir> <runs.json> <out.json>
local plugin, runs_path, out_path = arg[1], arg[2], arg[3]
vim.opt.rtp:prepend(plugin)
vim.env.XDG_DATA_HOME = vim.fn.tempname()
vim.o.showmode = false
vim.opt.shortmess:append('Sq')
vim.cmd.runtime('plugin/neurovim.lua')
local state = require('neurovim.state')
local missions = require('neurovim.missions')
local mission = require('neurovim.ui.mission')
local diff = require('neurovim.rules.diff')
state.update(function(s)
  s.unlocked = vim.tbl_map(function(m)
    return m.id
  end, missions.all())
  return s
end)
local function quiet(fn)
  local orig = vim.notify
  vim.notify = function() end
  local ok, err = pcall(fn)
  vim.notify = orig
  assert(ok, err)
end
local function close_floats()
  for _, w in ipairs(vim.api.nvim_list_wins()) do
    if vim.api.nvim_win_get_config(w).relative ~= '' then
      vim.api.nvim_win_close(w, true)
    end
  end
end
local runs = vim.json.decode(table.concat(vim.fn.readfile(runs_path), '\n'))
local out = {}
for _, r in ipairs(runs) do
  local m = missions.get(r.id)
  local old = vim.fn.bufnr('neurovim://' .. m.id)
  if old > 0 then
    vim.cmd('bwipeout! ' .. old)
  end
  close_floats()
  quiet(function()
    vim.cmd('NeuroVim mission ' .. m.id)
  end)
  if m.briefing ~= '' then
    vim.api.nvim_feedkeys(vim.api.nvim_replace_termcodes('<CR>', true, false, true), 'tx', false)
  end
  local buf = vim.api.nvim_get_current_buf()
  assert(vim.api.nvim_buf_get_name(buf) == 'neurovim://' .. m.id, r.id .. ': not in the mission buffer')
  -- Typed keys ("t"), without the user's mappings ("n"), executed now ("x") — as tests/e2e_spec.lua does.
  local ok, err = pcall(function()
    vim.g.par_keys = vim.api.nvim_replace_termcodes(r.keys, true, false, true)
    vim.cmd('silent call feedkeys(g:par_keys, "ntx")')
  end)
  vim.cmd('stopinsert')
  local text = table.concat(vim.api.nvim_buf_get_lines(buf, 0, -1, false), '\n')
  local d = diff.get_diff(text, m.solution)
  out[#out + 1] = {
    id = r.id,
    solved = d.matches,
    keys = mission.run(buf).tracker.keys(),
    lines_off = d.lines_off,
    error = ok and vim.NIL or tostring(err),
    text = d.matches and vim.NIL or text,
  }
end
vim.fn.writefile({ vim.json.encode(out) }, out_path)
