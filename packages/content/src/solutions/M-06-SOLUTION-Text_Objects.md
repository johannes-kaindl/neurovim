```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP — CONGLOMERATE OF REGULATED PROCESSES                      ║
║  Infrastructure Division — Endpoint Registry Extract             ║
╠══════════════════════════════════════════════════════════════════╣
║  Document Type  : Endpoint Registry Fragment — Serialized Export ║
║  Classification : Internal — Division Circulation                ║
║  Source         : Personnel Registry v2.3 (automated export)     ║
║  Audit Code     : ERX-2047-Q1-0143                               ║
║  Generator      : Registry Export Tool v1.8 (no human review)    ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Intercepted // Infrastructure Division
> GHOST pulled a serialized-export from the endpoint registry.
> CORP's export tool dumps records as structured data — dicts, lists, tuples. NEVERMORE hit the values inside the containers. Brackets, quotes, braces are intact. Values aren't.
> Fix what's inside. The containers stay.

---

endpoints = {
  "CELL-DELTA-01": {"sector": "sector-7-north", "clearance": "field-ops", "status": "active"},
  "CELL-DELTA-02": {"sector": "corp-adjacent", "clearance": "intelligence", "status": "active"},
  "GHOST": {"sector": "corp-internal", "clearance": "deep-cover", "status": "dark"},
}

access_codes = [
  ("CELL-DELTA-01", "sector-7-north", "7741"),
  ("CELL-DELTA-02", "corp-adjacent", "3392"),
  ("GHOST", "corp-internal", "0012"),
]

location = "relay-cluster-7"
frequency = "441.7"
window = "THE DIFF DOES NOT LIE"
response = "TRUST THE DIFF"
