import {Component, OnDestroy, OnInit} from '@angular/core';
import {searchService} from "../../../../core/services/search-service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Group} from "../../../../core/interfaces/interfaces";
import {GroupService} from "../../../../core/services/group-service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {
  groupArrayTest: Group[] = [{
    groupName: "Default",
    users: [{email: 'test@wp.p', name: 'Kuba'}, {email: 'test@wp.p', name: 'Maciek'}]
  },
    {groupName: "Default with group interface", users: [{email: 'test@wp.p', name: 'Kuba'}]}];

  groupNames: string[] = [];
  selectedGroupUsers: string[] = [];


  searchPhrase: string = '';
  searchPhraseSubscription!: Subscription;

  constructor(private searchService: searchService, private router: Router, private groupService: GroupService) {
  }

  ngOnInit() {
    this.searchPhraseSubscription = this.searchService.currentSearch.subscribe(search => this.searchPhrase = search)
    for (let i = 0; i < this.groupArrayTest.length; i++) {
      this.groupNames[i] = this.groupArrayTest[i].groupName;
    }
    this.groupService.currentUsers.subscribe(users => this.selectedGroupUsers = users)
  }

  ngOnDestroy() {
    this.searchPhraseSubscription.unsubscribe();
  }

  newGroupLink() {
    this.router.navigate(['/new-group'])
  }

  onGroupClick(groupName: string) {
    this.selectedGroupUsers = [];
    for (let i = 0; i < this.groupArrayTest[this.groupNames.indexOf(groupName)].users.length; i++) {
      this.selectedGroupUsers[i] = this.groupArrayTest[this.groupNames.indexOf(groupName)].users[i].name
    }
    this.groupService.changeSearch(this.selectedGroupUsers);
  }


}
