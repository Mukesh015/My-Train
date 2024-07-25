import { CheerioAPI } from 'cheerio';
class Prettify {
    BetweenStation(string: string): any {
      try {
        let obj: any = {};
        let retval: any = {};
        let arr: any[] = [];
        let obj2: any = {};
        let data: string[] = string.split("~~~~~~~~");
        let nore: string[] = data[0].split("~");
        nore = nore[5].split("<");
        if (nore[0] == "No direct trains found") {
          retval["success"] = false;
          retval["time_stamp"] = Date.now();
          retval["data"] = nore[0];
          return retval;
        }
        if (
          data[0] === "~~~~~Please try again after some time." ||
          data[0] === "~~~~~From station not found" ||
          data[0] === "~~~~~To station not found"
        ) {
          retval["success"] = false;
          retval["time_stamp"] = Date.now();
          retval["data"] = data[0].replace("~", "");
          return retval;
        }
        data = data.filter((el) => {
          return el != "";
        });
        for (let i = 0; i < data.length; i++) {
          let data1: string[] = data[i].split("~^");
          if (data1.length === 2) {
            data1 = data1[1].split("~");
            data1 = data1.filter((el) => {
              return el != "";
            });
            obj["train_no"] = data1[0];
            obj["train_name"] = data1[1];
            obj["source_stn_name"] = data1[2];
            obj["source_stn_code"] = data1[3];
            obj["dstn_stn_name"] = data1[4];
            obj["dstn_stn_code"] = data1[5];
            obj["from_stn_name"] = data1[6];
            obj["from_stn_code"] = data1[7];
            obj["to_stn_name"] = data1[8];
            obj["to_stn_code"] = data1[9];
            obj["from_time"] = data1[10];
            obj["to_time"] = data1[11];
            obj["travel_time"] = data1[12];
            obj["running_days"] = data1[13];
            obj2["train_base"] = obj;
            arr.push(obj2);
            obj = {};
            obj2 = {};
          }
        }
        retval["success"] = true;
        retval["time_stamp"] = Date.now();
        retval["data"] = arr;
        return retval;
      } catch (err) {
        console.warn(err);
      }
    }
  
    getDayOnDate(DD: string, MM: string, YYYY: string): number {
      let date = new Date(parseInt(YYYY), parseInt(MM) - 1, parseInt(DD));
      let day =
        date.getDay() >= 0 && date.getDay() <= 2
          ? date.getDay() + 4
          : date.getDay() - 3;
      return day;
    }
  
    GetRoute(string: string): any {
      try {
        let data: string[] = string.split("~^");
        let arr: any[] = [];
        let obj: any = {};
        let retval: any = {};
        for (let i = 0; i < data.length; i++) {
          let data1: string[] = data[i].split("~");
          data1 = data1.filter((el) => {
            return el != "";
          });
          obj["source_stn_name"] = data1[2];
          obj["source_stn_code"] = data1[1];
          obj["arrive"] = data1[3];
          obj["depart"] = data1[4];
          obj["distance"] = data1[6];
          obj["day"] = data1[7];
          obj["zone"] = data1[9];
          arr.push(obj);
          obj = {};
        }
        retval["success"] = true;
        retval["time_stamp"] = Date.now();
        retval["data"] = arr;
        return retval;
      } catch (err) {
        console.log(err);
      }
    }
    
    LiveStation($: CheerioAPI): any {
      let arr: any[] = [];
      let obj: any = {};
      let retval: any = {};
      $('.name').each((i: any, el: any) => {
        obj["train_no"] = $(el).text().slice(0, 5);
        obj["train_name"] = $(el).text().slice(5).trim();
        obj["source_stn_name"] = $(el).next("div").text().split("→")[0].trim();
        obj["dstn_stn_name"] = $(el).next("div").text().split("→")[1].trim();
        obj["time_at"] = $(el).parent("td").next("td").text().slice(0, 5);
        obj["detail"] = $(el).parent("td").next("td").text().slice(5);
        arr.push(obj);
        obj = {};
      });
      retval["success"] = true;
      retval["time_stamp"] = Date.now();
      retval["data"] = arr;
      return retval;
    }
  
   PnrStatus(string: string): any {
  let retval: any = {};
  var pattern = /data\s*=\s*({.*?;)/;
  let match = string.match(pattern);
  if (match) {
    let data = JSON.parse(match[0].slice(7, -1));
    retval["success"] = true;
    retval["time_stamp"] = Date.now();
    retval["data"] = data;
  } else {
    retval["success"] = false;
    retval["time_stamp"] = Date.now();
    retval["data"] = "No valid data found";
  }
  return retval;
}
  
    CheckTrain(string: string): any {
      try {
        let obj: any = {};
        let retval: any = {};
        let data: string[] = string.split("~~~~~~~~");
        if (
          data[0] === "~~~~~Please try again after some time." ||
          data[0] === "~~~~~Train not found"
        ) {
          retval["success"] = false;
          retval["time_stamp"] = Date.now();
          retval["data"] = data[0].replace("~", "");
          return retval;
        }
        let data1: string[] = data[0].split("~");
        data1 = data1.filter((el) => {
          return el != "";
        });
        if (data1[1].length > 6) {
          data1.shift();
        }
        obj["train_no"] = data1[1].replace("^", "");
        obj["train_name"] = data1[2];
        obj["from_stn_name"] = data1[3];
        obj["from_stn_code"] = data1[4];
        obj["to_stn_name"] = data1[5];
        obj["to_stn_code"] = data1[6];
        obj["from_time"] = data1[11];
        obj["to_time"] = data1[12];
        obj["travel_time"] = data1[13];
        obj["running_days"] = data1[14];
        data1 = data[1].split("~");
        data1 = data1.filter((el) => {
          return el != "";
        });
        obj["type"] = data1[11];
        obj["train_id"] = data1[12];
        obj["distance_from_to"] = data1[18];
        obj["average_speed"] = data1[19];
        retval["success"] = true;
        retval["time_stamp"] = Date.now();
        retval["data"] = obj;
        return retval;
      } catch (err) {
        console.warn(err);
      }
    }
  }
  
  export default Prettify;
  