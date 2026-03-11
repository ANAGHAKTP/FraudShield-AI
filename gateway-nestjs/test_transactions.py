import requests
import json
import time

base_url = "http://localhost:3000"

print("1. Logging in to get token...")
res = requests.post(f"{base_url}/auth/login", json={
    "email": "company@fraudshield.ai",
    "password": "securepassword"
})
if res.status_code != 200 and res.status_code != 201:
    print("Login failed! Trying to register first...")
    requests.post(f"{base_url}/auth/register", json={
        "email": "company@fraudshield.ai",
        "password": "securepassword"
    })
    res = requests.post(f"{base_url}/auth/login", json={
        "email": "company@fraudshield.ai",
        "password": "securepassword"
    })

if res.status_code != 200 and res.status_code != 201:
    print("Could not retrieve token!")
    exit(1)

token = res.json().get("access_token")
headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

print("\n2. Submitting dummy transaction...")
single_tx = {
    "amount": 299.99,
    "merchant": "Amazon AWS",
    "location": "Seattle, WA",
    "device": "iPhone 14 Pro"
}
res_tx = requests.post(f"{base_url}/transactions", json=single_tx, headers=headers)
print("Transaction response:", res_tx.status_code)
print(json.dumps(res_tx.json(), indent=2))

print("\n3. Testing /transactions/batch...")
batch_tx = [
    {
        "amount": 12.50,
        "merchant": "Starbucks",
        "location": "New York, NY",
        "device": "MacBook Air"
    },
    {
        "amount": 9999.00,
        "merchant": "Unknown Crypto Exchange",
        "location": "Moscow, RU",
        "device": "Linux Desktop"
    }
]

res_batch = requests.post(f"{base_url}/transactions/batch", json=batch_tx, headers=headers)
print("Batch Transaction response:", res_batch.status_code)
print(json.dumps(res_batch.json(), indent=2))
