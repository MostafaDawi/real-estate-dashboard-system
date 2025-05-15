from quart import Blueprint, jsonify, request, Response
from db_connect import create_supabase
import json

# Create a Blueprint for your main routes
main_routes = Blueprint('main', __name__)

# GET Transactions
@main_routes.route("/transactions", methods=["GET"])
async def transactions():
    supabase = await create_supabase()

    try:
        res = await supabase.from_("transactions").select("*").execute()
        print(res.data)
        return jsonify(res.data), 200
    except Exception as e:
        return jsonify({"Error":str(e)}), 400

# GET Aggregated Values (Max, Min prices and Sum of listings)
@main_routes.route("/agg_values", methods=["GET"])
async def get_agg_values():
    supabase = await create_supabase()

    try:
        res_max = await supabase.from_("district_prices").select("district, max_price_$").order("max_price_$", desc=True).limit(1).execute()
        res_min = await supabase.from_("district_prices").select("district, min_price_$").order("min_price_$", desc=False).limit(1).execute()
        res_sum = await supabase.from_("district_prices").select("listings_count.sum()").execute()
        high_tran = await supabase.from_("transactions").select("city, transaction_number.sum()").order("city", desc=False).execute()

        return jsonify({"max": "Max Price", "max_num": res_max.data[0]["max_price_$"], "region_max": res_max.data[0]["district"],
                        "min": "Min Price", "min_num": res_min.data[0]["min_price_$"], "region_min": res_min.data[0]["district"],
                        "sum": "Number of Lists", "sum_num": res_sum.data[0]["sum"], "region_all": "All Districts",
                        "ht": "Most Transactions", "high_num": high_tran.data[0]["sum"], "region_tran": high_tran.data[0]["city"]}), 200
    except Exception as e:
        return jsonify({"Error":str(e)}), 400
    
# GET All the listed data
@main_routes.route("/all_lists", methods=["GET"])
async def get_all_lists():
    supabase = await create_supabase()
    try:
        res = await supabase.from_("district_prices").select("id, district, median_price_$, avg_price_$, max_price_$, min_price_$, listings_count").order("max_price_$", desc=True).limit(20).execute()
        
        print(res.data[0])
        return Response(json.dumps(res.data), status=200, mimetype='application/json')
    except Exception as e:
        return jsonify({"Error":str(e)}), 400
    
# GET Province data
@main_routes.route("/provinces", methods=["GET"])
async def get_all_provinces():
    supabase = await create_supabase()
    try:
        res = await supabase.from_("provinces").select().execute()
        print(res.data)
        return jsonify(res.data), 200
    except Exception as e:
        return jsonify({"Error":str(e)}), 400
    
# GET Hottest Areas
@main_routes.route("/hot_areas", methods=["GET"])
async def get_all_hot_areas():
    supabase = await create_supabase()
    try:
        res = await supabase.from_("city_prices").select("city, listings_count, latitude, longitude").gt("listings_count", 400).execute()
        print(res.data)
        return jsonify(res.data), 200
    except Exception as e:
        return jsonify({"Error":str(e)}), 400
    
# GET Prices of apartments per m² Areas
@main_routes.route("/properties", methods=["GET"])
async def get_price_m2():
    supabase = await create_supabase()
    try:
        res = await supabase.from_("properties").select("city, province, type, price_$, size_m2, bedrooms, bathrooms").range(0,50).order("type").execute()
        print(res.data)
        return jsonify(res.data), 200
    except Exception as e:
        return jsonify({"Error":str(e)}), 400
    
# GET Lists per type
@main_routes.route("/lists_type", methods=["GET"])
async def get_lists_type():
    supabase = await create_supabase()
    try:
        res = await supabase.from_("properties").select("type").execute()

        type_dict = {}
        for row in res.data:
            if row["type"] not in type_dict:
                type_dict[row["type"]] = 1
            else:
                type_dict[row["type"]] += 1

        # Convert to list of objects
        formatted_data = [{"name": key, "value": value} for key, value in type_dict.items()]
        formatted_data.sort(key=lambda x: x["value"], reverse=True)

        print(type_dict)
        return jsonify(formatted_data), 200
    except Exception as e:
        return jsonify({"Error":str(e)}), 400