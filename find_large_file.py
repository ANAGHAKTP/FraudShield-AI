import subprocess

try:
    output = subprocess.check_output(['git', 'rev-list', '--all', '--objects'], text=True, encoding='utf-8')
    for line in output.splitlines():
        if '.csv' in line.lower():
            print(f"FOUND IN OBJECTS: {line}")
except Exception as e:
    print(f"Error: {e}")
