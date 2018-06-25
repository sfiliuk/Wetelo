/*Реалізувати функцію, яка приймає один
    параметр (об’єкт Date - дату народження, наприклад new Date(1990, 10, 5))
    та повертає вік - кількість повних років.
*/

        function howOld(date){
           var nowDate = new Date();
           var msDiff = nowDate.getTime()-date.getTime();
           return parseInt(msDiff/1000/60/60/24/365);
        }
        var yearsOld = howOld(new Date(1918, 5, 5));
        console.log(yearsOld);

/*Реалізувати базовий клас Square, конструктор якого
    приймає 2 параметри - width and height та має лише один публічний метод - getArea,
    який повертає площу фігури як width * height.
*/

       function Square(width, height){
           if(arguments.length>1){
               this.width = width;
               this.height = height;
           }
           else this.width=this.height=width;
       }
       Square.prototype.getArea = function(){
           return this.width*this.height;
       }
       var figure1 = new Square(10,7);
       var figure2 = new Square(5);
       console.log("Прямокутник: "+figure1.getArea());
       console.log("Квадрат: "+figure2.getArea());

/*Реалізувати клас Circle, який наслідується від Square
    та має свою власну реалізацію методу для обчислення площі.
*/
       function Circle(radius){
           
           Square.apply(this,arguments);
           this.PI = 3.14;
       }
       Circle.prototype.getArea = function(){
           return this.PI*this.width*this.height;
       }
       var figure3 = new Circle(10);
       var figure4 = new Circle(10,20);
       console.log("Круг: " + figure3.getArea());
       console.log("Еліпс: " + figure4.getArea());

/*Реалізувати клас Area, який має одну захищену властивість _figures - масив,
   та методи addFigure(figure) - додає об’єкт фігури в масив _figures clear - очищає масив _figures
*/
       function Area(){
           this._figures= new Array();
           this.addFigures = function(obj){
               this._figures.push(obj);
           }
           this.clear = function(){
            this._figures.splice(0,this._figures.length);
           }
       }
       
       
/*В класі Area реалізувати геттер size використовуючи Object.defineProperty,
    який повертає загальну площу всіх доданих фігур.
*/

        Object.defineProperty(Area.prototype, 'getSize', {
            get: function(){
                
                // Реалізація через reduce
                 var summ = Object.keys(this._figures).reduce(
                     (prev, key)=> prev + this._figures[key].getArea(),0);
                 return summ;

           
            /*// Реалізація через цикл
               var result=0;
               for (var f=0; f<this._figures.length; f++){
                   result+=this._figures[f].getArea();
               }
               return result;
               */
            }
        });
                
        var ManyFigures = new Area();
        
        ManyFigures.addFigures(figure1);
        ManyFigures.addFigures(figure2);
        ManyFigures.addFigures(figure4);
        console.log("TotalSize: " + ManyFigures.getSize);