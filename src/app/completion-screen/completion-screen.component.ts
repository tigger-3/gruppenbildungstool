import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { config } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-completion-screen',
  templateUrl: './completion-screen.component.html',
  styleUrls: ['./completion-screen.component.scss']
})
export class CompletionScreenComponent implements OnInit {

  kursid?: number;

  constructor(
    private route: ActivatedRoute,
    private cfg: ConfigService
    ) { }

  ngOnInit(): void {
    this.kursid = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
  }

  getGroupingPage(){
    return `${this.cfg.moodle_address}/group/groupings.php?id=${this.kursid}`
  }
  getCoursePage(){
    return `${this.cfg.moodle_address}/course/view.php?id=${this.kursid}`
  }
}
