using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE3314NetworkingAssignment1
{
    // this is interface is implemented by two classes: 
    //Class_BuyOrder and Class_SellOrder as per the given class diagram
    public interface Class_Order
    {
        DateTime getOrderDateTime();
        
        void setOrderDateTime(DateTime orderDateTime);

        Double getPrice();

        void setPrice(Double orderPrice);
        
        Double getOrderSize();

        void setOrderSize(Double orderSize);
        
    }
}
