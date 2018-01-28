import { TestBed, inject } from '@angular/core/testing';
import { GremlinClientOptions } from './gremlin-client-options';
import { GremlinService } from './gremlin.service';
import {GremlinQuery} from './gremlin.query';
import { GremlinQueryResponse } from './gremlin.query.response';

describe('GremlinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GremlinService]
    });
  });

  it('should be created', inject([GremlinService], (service: GremlinService) => {
    expect(service).toBeTruthy();
  }));

  it('should create a connection', inject([GremlinService], (service: GremlinService) => {
    const connection = service.createConnection(new GremlinClientOptions());
    expect(connection).toBeTruthy();
  }));

  it('should execute a gremlin query', inject([GremlinService], (service: GremlinService) => {
    const options = new GremlinClientOptions();
    const connection = service.createConnection(options);
    service.sendMessage('g.V()', (response: GremlinQueryResponse) => {
      console.log(response);
      expect(response).toBeTruthy();
    });
  }));
});
