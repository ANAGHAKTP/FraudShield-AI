import requests
import json

base_url = "http://localhost:3000"

print("1. Registering new user...")
res = requests.post(f"{base_url}/auth/register", json={
    "email": "company@fraudshield.ai",
    "password": "securepassword"
})
print("Register response:", res.status_code, res.json())

print("\n2. Logging in...")
res = requests.post(f"{base_url}/auth/login", json={
    "email": "company@fraudshield.ai",
    "password": "securepassword"
})
print("Login response:", res.status_code, res.json())

token = res.json().get("access_token")

print("\n3. Testing Protected Predict Endpoint Without Token...")
res_unauth = requests.post(f"{base_url}/predict", json={"features": [0]*29})
print("Unauth response:", res_unauth.status_code)

print("\n4. Testing Protected Predict Endpoint With Token...")
headers = {"Authorization": f"Bearer {token}"}
data = {
 "features":[
  -1.359807, -0.072781, 2.536347,
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
res_auth = requests.post(f"{base_url}/predict", json=data, headers=headers)
try:
    print("Auth response:", res_auth.status_code, res_auth.json())
except:
    print("Auth response:", res_auth.status_code, res_auth.text)
