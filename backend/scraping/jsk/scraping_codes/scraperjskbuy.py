from pathlib import Path


import re
import time
import requests
from bs4 import BeautifulSoup
import pandas as pd


base_url = "https://www.jskre.com/listings/for-sale"
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}


total_pages = 100

properties = []


for page_number in range(1, total_pages + 1):
    print(f"Scraping page {page_number}")
    url = f"{base_url}?page={page_number}"
    response = requests.get(url, headers=headers)

    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        
        main_section = soup.find('section', class_='max-w-[1366px] mx-auto')
        if main_section:
            
            listings = main_section.find_all('div', class_='flex my-7 mx-2.5 flex-col min-[1090px]:flex-row')

            for listing in listings:
                address = listing.find('address', class_='poppins-light property-location flex items-center gap-[5px]')
                address = address.text.strip() if address else "N/A"

                
                price = listing.find('p', class_='text-[#AD2F36] font-bold text-[18px] mt-2')
                price = price.text.strip() if price else "N/A"

                
                property_type = listing.find('div', class_='max-[344px]:mr-[5px] max-[344px]:pr-[5px] pr-3 mr-3 fixInSmallScreen')
                property_type = property_type.text.strip() if property_type else "N/A"

                
                size = "N/A"
                size_div = listing.find_all('div')
                for div in size_div:
                    img = div.find('img', src="/images/vector3.svg")
                    if img:
                        full_text = div.get_text(separator=" ", strip=True).replace('\xa0', ' ')
                        full_text = ' '.join(full_text.split())
                        match = re.search(r'(\d+\s*m²)', full_text)
                        if match:
                            size = match.group(1)
                            break
                
                
                bedrooms = "N/A"
                bedrooms_div = listing.find('div', class_='max-[344px]:mr-[5px] max-[344px]:pr-[5px] pr-2 mr-3')
                if bedrooms_div:
                    bedrooms_text = bedrooms_div.text.strip()
                    if bedrooms_text:
                        bedrooms = bedrooms_text.split(" ")[0]

                
                bathrooms = "N/A"
                bathrooms_div = listing.find_all('div', class_='max-[344px]:mr-[5px] max-[344px]:pr-[5px] pr-2 mr-3')
                if len(bathrooms_div) > 1:
                    bathrooms_text = bathrooms_div[1].text.strip()
                    if bathrooms_text:
                        bathrooms = bathrooms_text.split(" ")[0]

                
                properties.append({
                    'Address': address,
                    'Price': price,
                    'Type': property_type,
                    'Size': size,
                    'Bedrooms': bedrooms,
                    'Bathrooms': bathrooms
                })
    time.sleep(2)       

if properties:
    
    df = pd.DataFrame(properties)
    target_path = Path(__file__).resolve().parents[1]/"full_data"/"JSKREfullbuy.csv"
    df.to_csv(target_path, index=False)
    print(f"Data extracted and saved to JSKREfullbuy.csv. Total records: {len(df)}")
else:
    print("No listings found or unable to extract data.")