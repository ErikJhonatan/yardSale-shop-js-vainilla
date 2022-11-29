# Regression cases

Prepared for this change. **Not executed.** Tests, manual checks, lint and builds require explicit user authorization. Use isolated fixtures; never run destructive cases against production.

| Case | Input or setup | Expected outcome |
| --- | --- | --- |
| Storage | Corrupt cart JSON or invalid price | Safe empty/filtered cart |
| Price formats | Cart prices $12,50 and $0,30 | Total=12.80 |
| Rerender | Render catalogue/cart twice; empty-state function twice | One set of products and one empty state |
| Listeners | Rerender catalogue then click add icon and product image | Delegated add listener works; product detail receives explicit event |
| Deletion | Delete nonexistent product name | Other entries retained |
