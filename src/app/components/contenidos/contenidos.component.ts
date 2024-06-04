import { Component, OnInit } from '@angular/core';
import { ContenidosService } from 'src/app/services/contenidos.service';


@Component({
  selector: 'app-contenidos',
  templateUrl: './contenidos.component.html',
  styleUrls: ['./contenidos.component.css']
})
export class ContenidosComponent implements OnInit {
  educationalResources: any[] = [];
  augmentedRealityContent: any[] = [];
  interactiveSimulations: any[] = [];
  token = 'your-access-token-here';

  constructor(private contenidosService: ContenidosService) { }

  ngOnInit(): void {
    this.getAllEducationalResources();
    this.getAllAugmentedRealityContent();
    this.getAllInteractiveSimulations();
  }

  getAllEducationalResources(): void {
    this.contenidosService.getAllContenidosData(this.token).subscribe(data => {
      this.educationalResources = data.filter((item: { type: string; }) => item.type === 'educational');
    });
  }

  getAllAugmentedRealityContent(): void {
    this.contenidosService.getAllContenidosData(this.token).subscribe(data => {
      this.augmentedRealityContent = data.filter((item: { type: string; }) => item.type === 'augmented');
    });
  }

  getAllInteractiveSimulations(): void {
    this.contenidosService.getAllContenidosData(this.token).subscribe(data => {
      this.interactiveSimulations = data.filter((item: { type: string; }) => item.type === 'interactive');
    });
  }

  createNewContenido(type: string, newData: any): void {
    newData.type = type;
    this.contenidosService.newContenido(this.token, newData).subscribe(response => {
      console.log('New content created:', response);
      // Refresh the content lists
      this.getAllEducationalResources();
      this.getAllAugmentedRealityContent();
      this.getAllInteractiveSimulations();
    });
  }

  updateContenido(id: any, updatedData: any): void {
    this.contenidosService.updateContenido(this.token, id, updatedData).subscribe(response => {
      console.log('Content updated:', response);
      // Refresh the content lists
      this.getAllEducationalResources();
      this.getAllAugmentedRealityContent();
      this.getAllInteractiveSimulations();
    });
  }

  deleteContenido(id: any): void {
    this.contenidosService.deleteContenido(this.token, id).subscribe(response => {
      console.log('Content deleted:', response);
      // Refresh the content lists
      this.getAllEducationalResources();
      this.getAllAugmentedRealityContent();
      this.getAllInteractiveSimulations();
    });
  }
}
