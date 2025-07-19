from pathlib import Path
import pandas as pd
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut

file1 = Path(__file__).resolve().parents[3]/"scraping"/"realestate"/"clean_data"/"cleanrealestatebuy.csv"
file2 = Path(__file__).resolve().parents[3]/"scraping"/"jsk"/"clean_data"/"cleanjskbuy.csv"
file3 = Path(__file__).resolve().parents[2]/"dcoord.csv"

df1 = pd.read_csv(file1)
df2 = pd.read_csv(file2)
df3 = pd.read_csv(file3)


df = pd.concat([df1, df2], ignore_index=True)


valid_provinces = ["Mount Lebanon", "South", "Bekaa", "North", "Beirut", "Nabatieh"]
df["Province"] = df["Address"].str.extract(f'({"|".join(valid_provinces)})')


valid_districts = [
    "Hasbaya", "Marjaayoun", "Nabatieh", "Bint Jbeil", "Beirut", "Minieh-danniyeh", "Bcharre", "Tripoli", "Koura", "Akkar", 
    "Zgharta", "Batroun", "Hermel", "West Bekaa", "Zahle", "Baalbeck", "Rachaiya", "Jezzine", "Tyre", "Saida", "Aley", 
    "Baabda", "Chouf", "El Metn", "Jbeil", "Kesrouane"]
df["District"] = df["Address"].str.split(",").str[1].str.strip()
df["District"] = df["District"].where(df["District"].isin(valid_districts))


df["City"] = df["Address"].str.split(",").str[0].str.strip()

df = df.dropna(subset=["Province"])

df["Price $"] = pd.to_numeric(df["Price $"], errors='coerce')

# Create Province csv data with prices
province_summary = df.groupby("Province")["Price $"].agg(["mean", "median", "max", "min", "count"]).reset_index()
province_summary.columns = ["Province", "Avg Price $", "Median Price $", "Max Price $", "Min Price $", "Listings Count"]
province_summary[["Avg Price $", "Median Price $", "Max Price $", "Min Price $", "Listings Count"]] = province_summary[["Avg Price $", "Median Price $", "Max Price $", "Min Price $", "Listings Count"]].astype(int)

# Create District csv data with prices
district_summary = df.groupby("District")["Price $"].agg(["mean", "median", "max", "min", "count"]).reset_index()
district_summary = pd.merge(district_summary, df3, on="District", how="inner")
district_summary.columns = ["District", "Avg Price $", "Median Price $", "Max Price $", "Min Price $", "Listings Count", "Latitude", "Longitude"]
district_summary[["Avg Price $", "Median Price $", "Max Price $", "Min Price $", "Listings Count"]] = district_summary[["Avg Price $", "Median Price $", "Max Price $", "Min Price $", "Listings Count"]].astype(int)

# Create City csv data with prices
city = df.groupby("City")["Price $"].agg(["mean", "median", "max", "min", "count"]).reset_index()
city.columns = ["City", "Avg Price $", "Median Price $", "Max Price $", "Min Price $", "Listings Count"]
city[["Avg Price $", "Median Price $", "Max Price $", "Min Price $", "Listings Count"]] = city[["Avg Price $", "Median Price $", "Max Price $", "Min Price $", "Listings Count"]].astype(int)

# Create Properties csv data with details
properties_data_jsk = df[["City", "District", "Province", "Type", "Size m2", "Bedrooms","Bathrooms", "Price $"]]
properties_data_jsk = pd.merge(properties_data_jsk, df3, on="District", how="inner")
properties_data_jsk.columns = ["City", "District", "Province", "Type", "Size m2", "Bedrooms","Bathrooms", "Price $", "Latitude", "Longitude"]
properties_data_jsk = properties_data_jsk.dropna(subset=["Type"])
properties_data_jsk["Bedrooms"] = properties_data_jsk["Bedrooms"].fillna(0).astype(int)
properties_data_jsk["Size m2"] = properties_data_jsk["Size m2"].fillna(0).astype(int)
properties_data_jsk["Bathrooms"] = properties_data_jsk["Bathrooms"].fillna(0).astype(int)

# Export into csv files ready to be used
province_summary.to_csv(Path(__file__).resolve().parents[1]/"sorted_data"/"province_buysummary.csv", index=False)
district_summary.to_csv(Path(__file__).resolve().parents[1]/"sorted_data"/"district_buysummary.csv", index=False)
city.to_csv(Path(__file__).resolve().parents[1]/"sorted_data"/"city_buysummary.csv", index=False)
properties_data_jsk.to_csv(Path(__file__).resolve().parents[1]/"sorted_data"/"properties_jsk.csv", index=False)
print("Number of records for Provinces: ", province_summary.count())
print("Number of records for District: ", district_summary.count())
print("Number of records for City: ", city.count())
print("Number of records for Properties: ", properties_data_jsk.count())
print("Sorting complete.")
