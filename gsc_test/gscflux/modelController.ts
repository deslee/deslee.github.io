module GSC {
  export class ModelController {
    constructor(private service : Services.EntityService) {
      service.addChangeListener(() => this.update());
    }

    public update() {

    }
  }
}
