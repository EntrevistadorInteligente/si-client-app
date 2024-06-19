import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../../../services/nav.service';
@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {
  public menuItems: Menu[] = [];
  public items: Menu[] = [];
  public bookmarkItems: any[] = [];
  public urvish: any [] = []

  public text: string = '';

  public bookmarkFlip = false;
  public bookmark = false;

  public open = false;
  public searchResult = false;
  public searchResultEmpty = false;

  constructor(public navServices: NavService) { }

  ngOnInit(): void {
    this.navServices.items.subscribe(menuItems => {
      this.items = menuItems
      this.items.filter(items => {
        if (items.bookmark) {
          this.bookmarkItems.push(items)
          
        }
        if(!items.children) return false;
        items.children.filter(subItems => {
          if (subItems.bookmark) {
            this.bookmarkItems.push(subItems);
          }
        });
        return
      });
    });
  }

  ToggleSearch() {
    this.open = !this.open;
    this.removeFix();
  }

  openBookMark() {
    this.bookmark = !this.bookmark;
  }

  flipBookMark() {
    this.bookmarkFlip = !this.bookmarkFlip;
  }

  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) {
      this.open = false;
      return this.menuItems = [];
    }
    const items:any  = [];
    term = term.toLowerCase();
    this.items.filter((menuItems:any) => {​​
      if (!menuItems?.title) return false
      if (menuItems.title.toLowerCase().includes(term) && menuItems.type === 'link') {
        items.push(menuItems);
      }
      if (!menuItems.children) { return false; }
      menuItems.children.filter((subItems:any) => {
        if (subItems.title.toLowerCase().includes(term) && subItems.type === 'link') {
          subItems.icon = menuItems.icon;
          items.push(subItems);
        }
        if (!subItems.children) { return false; }
        subItems.children.filter((suSubItems:any) => {
          if (suSubItems.title.toLowerCase().includes(term)) {
            suSubItems.icon = menuItems.icon;
            items.push(suSubItems);
          }
        });
        return
      });
       this.checkSearchResultEmpty(items);
       
       return this.menuItems = items; 
    });
    return
  }
  checkSearchResultEmpty(items: string) {
    if (!items.length) {
      this.searchResultEmpty = true;
    } else {
      this.searchResultEmpty = false;
    }
  }

  addFix() {
    this.searchResult = true;
  }

  removeFix() {
    this.searchResult = false;
    this.text = '';
  }

  addToBookmark(items: any) {
    const index = this.bookmarkItems.indexOf(items);
    if (index === -1 && !items.bookmark) {
      items.bookmark = true;
      this.bookmarkItems.push(items);
      this.text = '';
    } else {
      this.bookmarkItems.splice(index, 1);
      items.bookmark = false;
    }
  }
}
