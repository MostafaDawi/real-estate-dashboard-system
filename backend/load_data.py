from pathlib import Path
import pandas as pd
from db_connect import create_supabase
import asyncio

source_path = Path(__file__).resolve().parent

# Open the csv files and save it into a DataFrame
df_tran = pd.read_csv(source_path/"Transactions"/"merged_all_cities.csv")

df_city = pd.read_csv(source_path/"sorting"/"buy"/"sorted_data"/"city_buysummary.csv")

df_prov = pd.read_csv(source_path/"sorting"/"buy"/"sorted_data"/"province_buysummary.csv")

df_dist = pd.read_csv(source_path/"sorting"/"buy"/"sorted_data"/"district_buysummary.csv")

df_prop = pd.read_csv(source_path/"sorting"/"buy"/"sorted_data"/"properties_jsk.csv")

supabase = None

async def establish_connection():
    global supabase
    supabase = await create_supabase()
    print("\nDatabase connection established...\n")
    

async def insert_trans_from_csv():
    data = None
    for i in range(len(df_tran["Date"])):
        object = { "date": df_tran["Date"][i],
                    "transaction_number": int(df_tran["Transaction_Number"][i]),
                    "city": str(df_tran["City"][i]),
                    "transaction_value": df_tran["Transaction_Value"][i], }
        print(type(object["transaction_number"]))
        try:
            data = await supabase.from_("transactions").upsert(object).execute()
            print(f"Inserted row: {i}")

        except Exception as e:
            print(f"Error occured: {e}")
            return
        
    print("Data inserted successfully!")

async def insert_city_from_csv():
    data = None
    for i in range(len(df_city["City"])):
        object = { "city": df_city["City"][i],
                    "avg_price in $": int(df_city["Avg Price $"][i]),
                    "median_price in $": int(df_city["Median Price $"][i]),
                    "max_price in $": int(df_city["Max Price $"][i]),
                    "min_price in $": int(df_city["Min Price $"][i]),
                    "listings_count": int(df_city["Listings Count"][i]), }
        try:
            data = await supabase.from_("district_prices").upsert(object).execute()
            print(f"Inserted row {i}")
        except Exception as e:
            print(f"Error occured: {e}")
            return
    print("Inserted Data Successfully!")

async def insert_district_from_csv():
    data = None
    for i in range(len(df_dist["District"])):
        object = { "city": df_dist["District"][i],
                    "avg_price_$": int(df_dist["Avg Price $"][i]),
                    "median_price_$": int(df_dist["Median Price $"][i]),
                    "max_price_$": int(df_dist["Max Price $"][i]),
                    "min_price_$": int(df_dist["Min Price $"][i]),
                    "listings_count": int(df_dist["Listings Count"][i]),
                    "latitude" : float(df_dist["Latitude"][i]),
                    "longitude": float(df_dist["Longitude"][i]) }
        try:
            data = await supabase.from_("city_prices").upsert(object).execute()
            print(f"Inserted row {i}")
        except Exception as e:
            print(f"Error occured: {e}")
            return
    print("Inserted Data Successfully!")


async def insert_properties_from_csv():
    data = None
    for i in range(len(df_prop["City"])):
        object = { "city": df_prop["City"][i],
                    "district": df_prop["District"][i],
                    "province": df_prop["Province"][i],
                    "type": df_prop["Type"][i],
                    "size_m2": int(df_prop["Size m2"][i]),
                    "bedrooms": int(df_prop["Bedrooms"][i]),
                    "bathrooms" : int(df_prop["Bathrooms"][i]),
                    "price_$": int(df_prop["Price $"][i]),
                    "latitude": float(df_prop["Latitude"][i]),
                    "longitude": float(df_prop["Longitude"][i])
                }
        try:
            data = await supabase.from_("properties").upsert(object).execute()
            print(f"Inserted row {i}")
        except Exception as e:
            print(f"Error occured: {e}")
            return
    print("Inserted Data Successfully!")

# async def insert_province_from_csv():
#     data = None
#     for i in range(len(df_prov["Province"])):
#         object = { "province": df_prov["Province"][i],
#                     "avg_price_$": int(df_prov["Avg Price $"][i]),
#                     "median_price_$": int(df_prov["Median Price $"][i]),
#                     "max_price_$": int(df_prov["Max Price $"][i]),
#                     "min_price_$": int(df_prov["Min Price $"][i]),
#                     "listings_count": int(df_prov["Listings Count"][i]),
#                     "latitude": float(df_prov["Latitude"][i]),
#                     "longitude": float(df_prov["Longitude"][i]), }
#         try:
#             data = await supabase.from_("provinces").upsert(object).execute()
#             print(f"Inserted row {i}")
#         except Exception as e:
#             print(f"Error occured: {e}")
#             return
#     print("Inserted Data Successfully!")

async def main():
    print("Main function is running")

    # Load the data into tables as needed
    results = await asyncio.gather(establish_connection(), 
                                   insert_trans_from_csv(), 
                                   insert_properties_from_csv(), 
                                   insert_district_from_csv(),
                                   insert_city_from_csv())

    print("Main function is done")
    print(results)

if __name__ == '__main__':
    asyncio.run(main())