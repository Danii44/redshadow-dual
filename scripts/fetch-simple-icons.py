import urllib.request
import json

for branch in ['main', 'master', 'develop']:
    try:
        url = f'https://raw.githubusercontent.com/simple-icons/simple-icons/{branch}/_data/simple-icons.json'
        with urllib.request.urlopen(url, timeout=10) as r:
            data = json.load(r)
        print('FOUND', branch, len(data['icons']))
        break
    except Exception as e:
        print('MISS', branch, e)
else:
    raise SystemExit('Could not find simple-icons JSON index')

searches = ['solidworks', 'fusion 360', 'autodesk fusion', 'keyshot', 'rhinoceros', 'rhino', 'substance painter', 'adobe substance']
for term in searches:
    hits = [item['slug'] for item in data['icons'] if term in item['title'].lower() or term in item['slug']]
    print(term, hits[:10])
