function Portal(url)
{
  var p = this;

  this.url = url;
  this.file = null;
  this.archive = new DatArchive(this.url);

  this.start = async function()
  {
    var file = await this.archive.readFile('/portal.json').then(console.log("done!"));

    this.json = JSON.parse(file);    
  }

  this.connect = async function()
  {
    console.log("connecting to: ",url);

    try {
      p.file = await p.archive.readFile('/portal.json').then(r.home.next);
    } catch (err) {
      console.log("connection failed: ",p.url)
      r.home.feed.next();
      return;
    }

    p.json = JSON.parse(p.file)
    r.home.feed.register(p)
    r.home.feed.next();
  }

  this.refresh = async function()
  {
    try {
      console.log("refreshing: ",p.url)
      p.file = await p.archive.readFile('/portal.json');
    } catch (err) {
      console.log("connection failed: ",p.url)
      return;
    }

    for(id in r.home.feed.portals){
      if(r.home.feed.portals[id].url == p.url){
        r.home.feed.portals[id] = p;
      }
    }

    p.json = JSON.parse(p.file)
  }

  this.entries = function()
  {
    var e = [];
    for(id in this.json.feed){
      var entry = new Entry(this.json.feed[id],p);
      entry.id = id;
      e.push(entry);
    }
    return e;
  }
}

r.confirm("script","portal");
