
$(function() {

    describe('RSS Feeds', function() {
        
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('feeds com url definidos', function() {
            const feeds = allFeeds.map(
                    (feed) =>
                    { 
                        expect(feed.url).not.toBe("");  //Verifica se a url não esta vazia
                        expect(typeof feed.url).not.toBe("undefined"); //Verifica se não foi inserido nenhuma url
                    }
                ) ;

        });


         it('feeds com nome definidos', function() {
            const feeds = allFeeds.map(
                (feed) =>
                { 
                    expect(feed.name).not.toBe(""); //Verifica se o nome não esta vazio
                    expect(typeof feed.name).not.toBe("undefined"); //Verifica se não foi inserido nenhuma nome
                }
                ) ;

        });

    });
   
    
    describe('The menu', function() {

        const menuHidden = document.getElementsByTagName("body")[0];  
        const iconeMenu = document.getElementsByClassName("icon-list")[0];

         
        it('O menu esta hidden', function() {

           expect(menuHidden.className).toContain('menu-hidden'); //Body possui a classe menu-hidden

        });

     
        it('menu esta funcional', function() {
             
            iconeMenu.click(); //clica no icone do menu
            expect(menuHidden.className).not.toContain('menu-hidden'); //Body NÃO possui a classe menu-hidden
            iconeMenu.click(); //clica no icone do menu 
            expect(menuHidden.className).toContain('menu-hidden'); //Body possui a classe menu-hidden

        });


    });

   
    describe('Initial Entries', function() {
        
        beforeEach(function(done)
        {
            loadFeed(0 , function(){ //Carrega os feeds
                done(); //Aguarda a conclusão do LoadFeed()
            });

        });
        
         it('pelo menos um feed presente', function() {
            entries = document.getElementsByClassName("entry"); //Monta um array com todos os entries
            expect(entries.length).toBeGreaterThanOrEqual(1);

        });
    });



    describe('New Feed Selection', function() {

        beforeEach(function(done)
        {
            loadFeed(0, function() {
                todosFeedsPrimeiraPag = document.querySelector('.feed').innerHTML; //copia todos os feeds do feed id 0
                
                //callback alinhado
                loadFeed(1, function() {
                    novosFeeds = document.querySelector('.feed').innerHTML; //copia todos os feeds do feed id 1
                    done();
                });
            });
        }); 

        
         it('Mudança de conteudo', function(done) {
            
            expect(novosFeeds).not.toBe(todosFeedsPrimeiraPag);
            
            done();
        });
    });
}());
