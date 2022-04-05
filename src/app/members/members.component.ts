import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[];

  // depenency injection…（DI）引数にデータ型でサービスを指定するとできる
  // 意味が分からない…
  constructor(
    private memberService: MemberService
  ) { }

  ngOnInit(): void {
    // コンストラクタの中で実行してもいいような気がするが、自身のプロパティを初期化するためだけに使われる
    // コンポーネントが初期化されるタイミングで実施されるものなので、こちらで実行させる
    this.getMembers();
  }

  getMembers(): void {
    this.memberService.getMembers() //observable
      .subscribe(members => this.members = members);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.memberService.addMember({ name } as Member)
      .subscribe(member => {
        this.members.push(member)
      });
  }
}
