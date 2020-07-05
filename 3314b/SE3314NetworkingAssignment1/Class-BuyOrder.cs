using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE3314NetworkingAssignment1
{
    public class Class_BuyOrder : Class_Order
    {
        //private class variables, the order size, price and time all initialiazed to null
        private DateTime orderDateTime;
        private Double orderSize;
        private Double orderPrice;
        
        //constructor for the class, which allocates values or defines thme
        public Class_BuyOrder(Double size, Double price)
        {
            this.orderDateTime = DateTime.Now;
            this.orderSize = size;
            this.orderPrice = price;

        }

        //Getter's and Setter's for the private class variables!
        //getter and setter of the Date/Time of the order
        public DateTime getOrderDateTime()
        {
            return this.orderDateTime;
        }

        public void setOrderDateTime(DateTime orderDateTime)
        {
            this.orderDateTime = orderDateTime;
        }

        //getter and setter of the Price of the order
        public Double getPrice()
        {
            return this.orderPrice;
        }

        public void setPrice(Double orderPrice)
        {
            this.orderPrice = orderPrice;
        }

        //getter and setter of the size of the order
        public Double getOrderSize()
        {
            return this.orderSize;
        }

        public void setOrderSize(Double orderSize)
        {
            this.orderSize = orderSize;
        }
        
    }
}
