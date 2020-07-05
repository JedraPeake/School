using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE3314NetworkingAssignment1
{
    // this is interface defines the structure for the realTimeData subject 
    public interface Class_StockMarket
    {
        // observers have the ability to register
        void Register(Class_StockMarketDisplay obser);
        // observers have the ability to unregister
        void Unregister(Class_StockMarketDisplay obser);
        // observers have the ability to be notified of information to be updated through realtimedata
        void Notify();
    }
}
