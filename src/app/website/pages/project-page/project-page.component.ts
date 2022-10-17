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

  titleProject!: string;
  projectOnly!:ProjectApiInterface[];
  // public loading: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private _projectsService: ProjectsService,private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      // this.loading = true;
      this.titleProject = params['title'];

      this._projectsService.getProjectObservable(this.titleProject).subscribe({
        next:(data:ProjectApiInterface[])=>{
          this.projectOnly = data;
          if (this.projectOnly == undefined || this.projectOnly.length == 0) {
            this.router.navigate(['/', 'not-found']);
          }
        },
        error:(error)=>{
          console.log(error);
        },
        complete:()=>{
          console.log("getProjectsObservable completado");
        }
      });
    });
  }

  ngOnInit(): void {
  }
}
