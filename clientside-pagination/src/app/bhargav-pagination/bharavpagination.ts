// scope: client side pagination
// author: venkata bhargava rao kurapati, IBM
// version: 1.0.0 / 2020
  
  
export class bhargavPagination {  
/* pagination vars */
  tablelist:any = {};
  currentPage:number = 1;
  numberPerPage:number = 10;
  numberOfPages:number = 0;

makeList(templist) {

    this.tablelist = templist.data;
    this.numberOfPages = this.getNumberOfPages();
  }
    
  getNumberOfPages() {
    console.log("getNumberOfPages",Math.ceil(this.tablelist.length / this.numberPerPage));
    return Math.ceil(this.tablelist.length / this.numberPerPage);
  }
  currentPageNo(){
      return this.currentPage;
  }

  load(data,control,range) {
   // alert("load-called");
   console.log("control::",control);
   if(control=='_f'){
    this.numberPerPage=range;
    this.makeList(data);
    this.currentPage = 1;
   }
   else if(control=='_n'){
    this.currentPage += 1;
   }
   else if(control=='_p'){
    this.currentPage -= 1;
   }
   else if(control=='_l'){
    this.currentPage = this.numberOfPages;
   }
    
   let begin = ((this.currentPage - 1) * this.numberPerPage);
   let end = begin + this.numberPerPage;
   console.log("begin::",begin, "--- end::",end);
   return  this.tablelist.slice(begin, end);
  }
    /* pagination code ends : venkata */
}