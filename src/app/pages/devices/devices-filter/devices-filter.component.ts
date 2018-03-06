import { Output, Input, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

var context: any;

@Component({
  selector: 'app-devices-filter',
  templateUrl: './devices-filter.component.html',
  styleUrls: ['./devices-filter.component.scss']
})
export class DevicesFilterComponent implements OnInit {

  saved: boolean = false;

  @Input() title: string;
  @Input() showEntityName: boolean = false;
  @Input() filtersApplied: string = "0";

  @Output() onApplyFilters = new EventEmitter<any>();
  @Output() onResetFilters = new EventEmitter();


  formData: any = {};


  constructor() {
    context = this;
  }

  ngOnInit() {
  }

  resetFilters(): void{
    this.cleanFields();
    this.onResetFilters.emit();
  }

  applyFilters(): void{
    this.onApplyFilters.emit(this.formData);
  }

  getActiveFilters(){
   return this.filtersApplied;
  }


  cleanFields(){
    this.formData = {};
  }

}
