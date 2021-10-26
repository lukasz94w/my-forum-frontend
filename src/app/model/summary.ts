export class Summary {

  //general subjects
  totalGSub: number;
  tprog: number;
  pprog: number;
  tsport: number;
  psport: number;
  telect: number;
  pelect: number;
  tcar: number;
  pcar: number;

  //other subjects
  totalOSub: number;
  tintro: number;
  pintro: number;
  tadver: number;
  padver: number;
  tpers: number;
  ppers: number;

  constructor(totalGSub: number, tprog: number, pprog: number, tsport: number, psport: number, telect: number, pelect: number, tcar: number, pcar: number, totalOSub: number, tintro: number, pintro: number, tadver: number, padver: number, tpers: number, ppers: number) {

    this.totalGSub = totalGSub;
    this.tprog = tprog;
    this.pprog = pprog;
    this.tsport = tsport;
    this.psport = psport;
    this.telect = telect;
    this.pelect = pelect;
    this.tcar = tcar;
    this.pcar = pcar;

    this.totalOSub = totalOSub;
    this.tintro = tintro;
    this.pintro = pintro;
    this.tadver = tadver;
    this.padver = padver;
    this.tpers = tpers;
    this.ppers = ppers;
  }
}
