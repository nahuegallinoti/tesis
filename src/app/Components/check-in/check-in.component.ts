import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Evento } from 'src/app/Models/evento.model';
import { Reserva } from 'src/app/Models/reserva.model';
import { ReservaService } from 'src/app/Services/reserva.service';
import { UIService } from 'src/app/Shared/ui.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

  eventosMat = new MatTableDataSource<Evento>();
  eventos: Evento [] = [];
  isLoading = false;
  panelOpenState = false;
  isLoadingSubscription: Subscription;
  eventosSubscription: Subscription;

  private sort: MatSort;
  private paginator: MatPaginator;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.eventosMat.sort = this.sort;
    this.eventosMat.paginator = this.paginator;
  }


  constructor(
    private reservaService: ReservaService,
    private uiService: UIService
  ) {}



  ngOnInit(): void {
    this.isLoadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
    this.eventosSubscription = this.reservaService.eventosChanged.subscribe(
      (eventos) => {
        this.eventos = eventos;
        console.log(this.eventos);
      }
    );

    this.reservaService.buscarEventos();
  }

  ngAfterViewInit(): void {
    this.eventosMat.sort = this.sort;
  }

  mostrarDetalleReserva(reserva: Reserva): void{  
    console.log(reserva);
  }

}
