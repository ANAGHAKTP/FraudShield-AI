import requests
import json

url = "http://127.0.0.1:8000/predict"
data = {
 "features":[
  0.0, -1.359807, -0.072781, 2.536347,
  1.378155, -0.338321, 0.462388,
  0.239599, 0.098698, 0.363787,
  0.090794, -0.5516, -0.6178,
  -0.9913, -0.3111, 1.4681,
  -0.4704, 0.2079, 0.0257,
  0.4039, 0.2514, -0.0183,
  0.2778, -0.1104, 0.0669,
  0.1285, -0.1891, 0.1335,
  -0.0210, 0.4967
 ]
}

headers = {'Content-Type': 'application/json'}
response = requests.post(url, data=json.dumps(data), headers=headers)

if response.status_code == 200:
    print("Success:")
    print(json.dumps(response.json(), indent=2))
else:
    print(f"Failed with status code: {response.status_code}")
    print(response.text)
