-- Headless measurement: nvim --headless -u NONE -l headless.lua
-- (1) M-01 played with real keystrokes must match; the untouched text must not (counter-check).
-- (2) Every mission whose briefing names Ex commands under SKILLS: run them in real Neovim
--     against the transmission and let the core score the result.
local here = vim.fn.fnamemodify(debug.getinfo(1, 'S').source:sub(2), ':h')
vim.opt.rtp:prepend(here)
local nv = require('neurovim')
local out = {}
local function say(s) table.insert(out, s) end

-- (1) Real keystrokes: record "find the next capital X or Z, delete it", replay 29 times.
-- Flag `t` matters: without it the keys do not count as typed and `q` records nothing.
local buf = nv.open('M-01')
vim.api.nvim_feedkeys('gg0qa/\\C[XZ]\rxq29@a', 'ntx', false)
say(('M-01 keys      : %s'):format(vim.inspect(nv.check(buf))))
local raw = nv.open('M-01')
say(('M-01 untouched : %s'):format(vim.inspect(nv.check(raw))))

-- (2) SKILLS commands. Extraction is a heuristic: backticked spans starting with ':' inside
-- the `[!tip] SKILLS` callout of the briefing.
local function skills(briefing)
  local cmds, inside = {}, false
  for line in (briefing .. '\n'):gmatch('([^\n]*)\n') do
    if line:find('%[!tip%] SKILLS') then
      inside = true
    elseif inside and not line:match('^>%s*>') then
      inside = false
    end
    if inside then
      for span in line:gmatch('`(:[^`]+)`') do table.insert(cmds, span) end
    end
  end
  return cmds
end

local tally = {}
for _, s in ipairs(nv.request_sync({ cmd = 'list' }).missions) do
  local m = nv.request_sync({ cmd = 'get', mission = s.id }).mission
  local cmds = skills(m.briefing)
  if #cmds > 0 then
    local b = nv.open(s.id)
    local errs = {}
    for _, c in ipairs(cmds) do
      local ok, err = pcall(vim.cmd, c:sub(2))
      if not ok then table.insert(errs, (err:gsub('\n', ' '))) end
    end
    local r = nv.check(b)
    local verdict = r.matches and 'MATCH' or ('MISMATCH (%d lines)'):format(r.lines_off)
    tally[verdict:match('^%u+')] = (tally[verdict:match('^%u+')] or 0) + 1
    say(('%-8s %-9s %-22s %s%s'):format(s.id, s.category, verdict, table.concat(cmds, '  '),
      #errs > 0 and ('  !! ' .. table.concat(errs, ' | ')) or ''))
    vim.api.nvim_buf_delete(b, { force = true })
  end
end
say(('tally: %s'):format(vim.inspect(tally)))
vim.fn.writefile(out, vim.env.NV_OUT or 'result.txt')
vim.cmd('qa!')
