import pathlib
import re

root = pathlib.Path('src')
import_pattern = re.compile(r'^\s*import\s+.*?\s+from\s+["\'](.*?)["\']', re.M)
failed = []
files = [p for p in root.rglob('*') if p.is_file()]
print('checked', len(files), 'files')
for p in files:
    if p.suffix in ('.js', '.jsx'):
        text = p.read_text(encoding='utf-8')
        for m in import_pattern.finditer(text):
            mod = m.group(1)
            if mod.startswith('.'):
                candidate = (p.parent / mod)
                if not any(candidate.with_suffix(ext).exists() for ext in ['.js', '.jsx', '.ts', '.tsx']) and not candidate.exists():
                    failed.append((str(p), mod, str(candidate)))
if failed:
    print('FAILURES:')
    for item in failed:
        print(item)
else:
    print('ALL relative imports resolved.')
