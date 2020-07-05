using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE3314NetworkingAssignment1
{
    // this is interface defines the necessary structure for the observers
    public interface Class_StockMarketDisplay
    {
        // each observer has an update method to update thier data values using realtimedata
        void Update(Class_RealTimeData subject);
    }
}
