import { BwalletPage } from './app.po';

describe('bwallet App', function() {
  let page: BwalletPage;

  beforeEach(() => {
    page = new BwalletPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
