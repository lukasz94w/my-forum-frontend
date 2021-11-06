import {Topic} from "./topic";

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

  latestTopProg: Topic;
  latestTopSport: Topic;
  latestTopElect: Topic;
  latestTopCar: Topic = {} as Topic;

  latestTopIntro: Topic;
  latestTopAdver: Topic;
  latestTopPers: Topic;


  constructor(totalGSub: number, tprog: number, pprog: number, tsport: number, psport: number, telect: number, pelect: number, tcar: number, pcar: number, totalOSub: number, tintro: number, pintro: number, tadver: number, padver: number, tpers: number, ppers: number, latestTopProg: Topic, latestTopSport: Topic, latestTopElect: Topic, latestTopCar: Topic, latestTopIntro: Topic, latestTopAdver: Topic, latestTopPers: Topic) {
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

    this.latestTopProg = latestTopProg;
    this.latestTopSport = latestTopSport;
    this.latestTopElect = latestTopElect;
    this.latestTopCar = latestTopCar;

    this.latestTopIntro = latestTopIntro;
    this.latestTopAdver = latestTopAdver;
    this.latestTopPers = latestTopPers;
  }
}
