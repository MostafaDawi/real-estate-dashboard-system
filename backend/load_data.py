import pandas as pd
from db_connect import create_supabase
import asyncio

# Open the csv files and save it into a DataFrame
# df = pd.read_csv("../Transactions/merged_all_cities.csv")

# df = pd.read_csv("../sorting/buy/sorted_data/city_buysummary.csv")

# df = pd.read_csv("./sorting/buy/sorted_data/province_buysummary.csv")

# df = pd.read_csv("./sorting/buy/sorted_data/district_buysummary.csv")

# df = pd.read_csv("./sorting/buy/sorted_data/properties_jsk.csv")

supabase = None

async def establish_connection():
    global supabase
    supabase = await create_supabase()
    print("\nDatabase connection established...\n")
    

# async def insert_trans_from_csv():
#     data = None
#     for i in range(len(df["Date"])):
#         object = { "date": df["Date"][i],
#                     "transaction_number": int(df["Transaction_Number"][i]),
#                     "city": str(df["City"][i]),
#                     "transaction_value": df["Transaction_Value"][i], }
#         print(type(object["transaction_number"]))
#         try:
#             data = await supabase.from_("transactions").upsert(object).execute()
#             print(f"Inserted row: {i}")

#         except Exception as e:
#             print(f"Error occured: {e}")
#             return
        
#     print("Data inserted successfully!")

# async def insert_city_from_csv():
#     data = None
#     for i in range(len(df["City"])):
#         object = { "city": df["City"][i],
#                     "avg_price in $": int(df["Avg Price $"][i]),
#                     "median_price in $": int(df["Median Price $"][i]),
#                     "max_price in $": int(df["Max Price $"][i]),
#                     "min_price in $": int(df["Min Price $"][i]),
#                     "listings_count": int(df["Listings Count"][i]), }
#         try:
#             data = await supabase.from_("district_prices").upsert(object).execute()
#             print(f"Inserted row {i}")
#         except Exception as e:
#             print(f"Error occured: {e}")
#             return
#     print("Inserted Data Successfully!")

# async def insert_district_from_csv():
#     data = None
#     for i in range(len(df["District"])):
#         object = { "city": df["District"][i],
#                     "avg_price_$": int(df["Avg Price $"][i]),
#                     "median_price_$": int(df["Median Price $"][i]),
#                     "max_price_$": int(df["Max Price $"][i]),
#                     "min_price_$": int(df["Min Price $"][i]),
#                     "listings_count": int(df["Listings Count"][i]),
#                     "latitude" : df["Latitude"][i],
#                     "longitude": df["Longitude"][i] }
#         try:
#             data = await supabase.from_("city_prices").upsert(object).execute()
#             print(f"Inserted row {i}")
#         except Exception as e:
#             print(f"Error occured: {e}")
#             return
#     print("Inserted Data Successfully!")


# async def insert_properties_from_csv():
#     data = None
#     for i in range(len(df["City"])):
#         object = { "city": df["City"][i],
#                     "district": df["District"][i],
#                     "province": df["Province"][i],
#                     "type": df["Type"][i],
#                     "size_m2": int(df["Size m²"][i]),
#                     "bedrooms": int(df["Bedrooms"][i]),
#                     "bathrooms" : int(df["Bathrooms"][i]),
#                     "price_$": int(df["Price $"][i]),
#                     "latitude": float(df["Latitude"][i]),
#                     "longitude": float(df["Longitude"][i])
#                 }
#         try:
#             data = await supabase.from_("properties").upsert(object).execute()
#             print(f"Inserted row {i}")
#         except Exception as e:
#             print(f"Error occured: {e}")
#             return
#     print("Inserted Data Successfully!")

# async def insert_province_from_csv():
#     data = None
#     for i in range(len(df["Province"])):
#         object = { "province": df["Province"][i],
#                     "avg_price_$": int(df["Avg Price $"][i]),
#                     "median_price_$": int(df["Median Price $"][i]),
#                     "max_price_$": int(df["Max Price $"][i]),
#                     "min_price_$": int(df["Min Price $"][i]),
#                     "listings_count": int(df["Listings Count"][i]),
#                     "latitude": float(df["Latitude"][i]),
#                     "longitude": float(df["Longitude"][i]), }
#         try:
#             data = await supabase.from_("provinces").upsert(object).execute()
#             print(f"Inserted row {i}")
#         except Exception as e:
#             print(f"Error occured: {e}")
#             return
#     print("Inserted Data Successfully!")

# async def main():
#     print("Main function is running")
#
#     # Load the data into tables as needed
#     results = await asyncio.gather(establish_connection(), insert_province_from_csv())
#
#     print("Main function is done")
#     print(results)

# if __name__ == '__main__':
#     asyncio.run(main())