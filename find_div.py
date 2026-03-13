
with open(r'c:\Users\Abhi\Desktop\saveweb2zip-com-johnson-template-webflow-io\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Position 6:8621 means line 6, character 8621.
lines = content.splitlines()
line_6 = lines[5] # 0-indexed
pos = 8621
context_start = max(0, pos - 100)
context_end = min(len(line_6), pos + 100)
print(f"Context: ...{line_6[context_start:pos]}>>>HERE<<<{line_6[pos:context_end]}...")
