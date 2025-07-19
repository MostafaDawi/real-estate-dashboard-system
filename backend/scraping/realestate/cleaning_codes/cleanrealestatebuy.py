import pandas as pd

def process_real_estate_data(realestate_path, location_data_path, output_csv_path):
    
    realestate_df = pd.read_excel(realestate_path)
    location_df = pd.read_excel(location_data_path)
    
    
    location_dict = dict(zip(location_df['id'], location_df['name_en']))
    
    
    def get_address(province_id, district_id, community_id):
        province_name = location_dict.get(f'p{province_id}', '').replace(' Governorate', '')
        district_name = location_dict.get(f'd{district_id}', '').replace(' district', '')
        community_name = location_dict.get(f'c{community_id}', '')
        return f"{community_name}, {district_name}, {province_name}"
    
    
    realestate_df['Address'] = realestate_df.apply(
        lambda row: get_address(row['ProvinceID'], row['DistrictID'], row['Community_id']), axis=1
    )


    for col in realestate_df.columns:
        if realestate_df[col].dtype == 'float64':
            realestate_df[col] = realestate_df[col].astype(object)
    
    
    realestate_df.fillna('N/A', inplace=True)
    
    
    realestate_df['Bedroom'] = pd.to_numeric(realestate_df['Bedroom'], errors='coerce').fillna('N/A').astype(str).str.replace('.0$', '', regex=True)
    realestate_df['Bathroom'] = pd.to_numeric(realestate_df['Bathroom'], errors='coerce').fillna('N/A').astype(str).str.replace('.0$', '', regex=True)
    
    
    final_df = realestate_df[['Address', 'Price', 'Area sqm', 'Bedroom', 'Bathroom', 'Furnished']]
    final_df.columns = ['Address', 'Price $', 'Size m2', 'Bedrooms', 'Bathrooms', 'Furnished']
    
    
    final_df.to_csv(output_csv_path, index=False, encoding='utf-8')
    
    print(f"CSV file saved to {output_csv_path}")


realestate_file = "realestate.xlsx"
location_file = "location_full_data.xlsx"
output_file = "cleanrealestatebuy.csv"


process_real_estate_data(realestate_file, location_file, output_file)