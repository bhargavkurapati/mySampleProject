import { Component, OnInit } from '@angular/core';
import { AppDetailsService } from '../app-details.service'
import { bhargavPagination } from './bharavpagination';

@Component({
  selector: 'app-bhargav-pagination',
  templateUrl: './bhargav-pagination.component.html',
  styleUrls: ['./bhargav-pagination.component.css']
})
export class BhargavPaginationComponent implements OnInit {
  
  templates:any={};
  currentTemplate:any={};
  colCounter:any;
  
  // /* pagination vars */
  pageList:any = {};
  _PAGERANGE:any=10;
  pg:any;
  currentPageNo:any=1;
  totalPages:any=1;
  // /* pagination vars */

  constructor(private AppDetailsService : AppDetailsService) 
  { 
    this.pg = new bhargavPagination(); 
  }

  ngOnInit(): void {
    this.renderTemplate('1');
  }

  renderTemplate(sectionID: string) {
    //this.prevCategory = "";
    let URL ="../assets/json/dataset.json";
    this.AppDetailsService.getApiService(URL)
    .subscribe(
      (data) => {
        this.templates=data['response'].editvalues; 
        console.log("templates::", this.templates);
        this.templates.sections.forEach(tmp => {
          console.log(tmp.sectionID ,"==" , sectionID);
          if (tmp.sectionID == sectionID) {
            this.currentTemplate = tmp;
            this.colCounter =  0;
          //initialising pagination 
          console.log("currentTemplate::",this.currentTemplate);
            this.pageList = this.pg.load(tmp,'_f',this._PAGERANGE);
            console.log("this.pageList:::",this.pageList);
            this.totalPages = this.pg.getNumberOfPages();
          }
        });

      });

  }

   //onclick of pagination controlls rows will be refreshed
   pageControls(control){
    this.pageList = this.pg.load(this.currentTemplate,control,this._PAGERANGE);
    this.currentPageNo=this.pg.currentPageNo();
  }
  colFwd() {
    this.colCounter++;
  }
  
  colBwd() {
    this.colCounter--;
    if (this.colCounter < 0) {
      this.colCounter = 0;
    }
  }
}
