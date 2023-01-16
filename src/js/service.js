// import { reject } from "core-js/fn/promise";

// function httpGetAsync(theURL, reslove){
//     var xmlHttp= new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() {
//         if(xmlHttp.readyState == 4 && xmlHttp.status ==200) reslove(xmlHttp);
//     };
//     xmlHttp.open("GET", theURL, true);
//     xmlHttp.send(null);
// }

// const currentPromise= new Promise((resolve, reject )=>{
//     httpGetAsync('https://amis.manhnv.net/api/v1/Employees', resolve)
// });

// 

// export EmployeeService ;
import EmployeeService from "./EmployeeService";
export {EmployeeService};