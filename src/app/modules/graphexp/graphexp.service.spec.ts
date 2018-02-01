import { TestBed, inject } from '@angular/core/testing';
import { GremlinClientOptions, GremlinQueryResponse} from '@savantly/gremlin-js';
import { GraphexpService } from './graphexp.service';

const options = new GremlinClientOptions();
const graphexpService = new GraphexpService(options);

describe('GraphexpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: GraphexpService, useValue: graphexpService
      }]
    });
  });

  it('should be created', inject([GraphexpService], (service: GraphexpService) => {
    expect(service).toBeTruthy();
  }));
  
  it('should execute query', inject([GraphexpService], (service: GraphexpService) => {
    service.queryGraphInfo().then((data) => {
      console.log(data);
      expect(data).toBeTruthy();
    });
  }));
});
