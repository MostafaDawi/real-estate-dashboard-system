from pathlib import Path
import pandas as pd

source_path = Path(__file__).resolve().parents[1]/"full_data"/"JSKREfullbuy.csv"
df = pd.read_csv(source_path)


df = df[~df['Address'].str.contains('France', case=False)]

df['Size'] = df['Size'].str.replace(' m²', '').str.replace(',', '')



df['Price'] = df['Price'].replace({'\$': '', ',': ''}, regex=True)


df.rename(columns={'Price': 'Price $'}, inplace=True)
df.rename(columns={'Size': 'Size m2'}, inplace=True)


df['Bedrooms'] = df['Bedrooms'].apply(lambda x: 'N/A' if x == 'N/A' else (int(x) if pd.notna(x) else 'N/A'))
df['Bathrooms'] = df['Bathrooms'].apply(lambda x: 'N/A' if x == 'N/A' else (int(x) if pd.notna(x) else 'N/A'))

target_path = Path(__file__).resolve().parents[1]/"clean_data"/"cleanjskbuy.csv"
df.to_csv(target_path, index=False)

print("CSV file cleaned and saved as 'cleanjskbuy.csv'.")