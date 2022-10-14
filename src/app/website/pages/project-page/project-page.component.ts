import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Services
import { ProjectsService } from './../../services/projects.service';
// Interface
import { ProjectApiInterface } from './../../interface/project-api.interface';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  titleProject: any={};
  projectOnly:any ={};

  constructor(private activatedRoute: ActivatedRoute, private _projectsService: ProjectsService,private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.titleProject = params['title'];
      if (this._projectsService.getProject(this.titleProject) == undefined) {
        this.router.navigate(['/', 'home']);
      }
    });
  }

  ngOnInit(): void {
    this.projectOnly = this._projectsService.getProject(this.titleProject);
  }
}
