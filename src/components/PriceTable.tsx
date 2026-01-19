import React from 'react';

interface PriceTableProps {
  setIsModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalTitle?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PriceTable: React.FC<PriceTableProps> = ({ setIsModalShow, setIsModalTitle }) => {
  const handleUnlockPrice = () => {
    if (setIsModalShow && setIsModalTitle) {
      setIsModalShow(true);
      setIsModalTitle(true);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-8 lg:px-[120px]">
      <h2 className="text-center font-['Prata'] text-2xl sm:text-4xl lg:text-5xl text-[#94684B] mb-8">
        3&4 BHK Luxury Apartments at Kokapet
      </h2>
      
      <div className="max-w-4xl mx-auto overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#C69C7B] text-white">
              <th className="py-4 px-6 text-left font-['Prata'] text-lg"><h3>Type</h3></th>
              <th className="py-4 px-6 text-left font-['Prata'] text-lg"><h3>Area (sq.ft)</h3></th>
              <th className="py-4 px-6 text-center font-['Prata'] text-lg"><h3>Price</h3></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#E5E7EB] bg-white">
              <td className="py-4 px-6 font-['Prata']"><h4>3BHK</h4></td>
              <td className="py-4 px-6 font-['Prata']"><h4>1400</h4></td>
              <td className="py-4 px-6">
                <button
                  onClick={handleUnlockPrice}
                  className="bg-[#C69C7B] text-white px-4 py-2 rounded hover:bg-[#94684B] transition-colors mx-auto block"
                >
                 <h4> Unlock Price</h4>
                </button>
              </td>
            </tr>
            <tr className="border-b border-[#E5E7EB] bg-white">
              <td className="py-4 px-6 font-['Prata']"><h4>3BHK</h4></td>
              <td className="py-4 px-6 font-['Prata']"><h4>1670</h4></td>
              <td className="py-4 px-6">
                <button
                  onClick={handleUnlockPrice}
                  className="bg-[#C69C7B] text-white px-4 py-2 rounded hover:bg-[#94684B] transition-colors mx-auto block"
                >
                  <h4>Unlock Price</h4>
                </button>
              </td>
            </tr>
            
            <tr className="border-b border-[#E5E7EB] bg-white">
              <td className="py-4 px-6 font-['Prata']"><h4>3BHK</h4></td>
              <td className="py-4 px-6 font-['Prata']"><h4>2050</h4></td>
              <td className="py-4 px-6">
                <button
                  onClick={handleUnlockPrice}
                  className="bg-[#C69C7B] text-white px-4 py-2 rounded hover:bg-[#94684B] transition-colors mx-auto block"
                >
                 <h4> Unlock Price</h4>
                </button>
              </td>
            </tr>
       
            <tr className="border-b border-[#E5E7EB] bg-white">
              <td className="py-4 px-6 font-['Prata']"><h4>3BHK</h4></td>
              <td className="py-4 px-6 font-['Prata']"><h4>2740</h4></td>
              <td className="py-4 px-6">
                <button
                  onClick={handleUnlockPrice}
                  className="bg-[#C69C7B] text-white px-4 py-2 rounded hover:bg-[#94684B] transition-colors mx-auto block"
                >
                 <h4> Unlock Price</h4>
                </button>
              </td>
            </tr>
      
            <tr className="border-b border-[#E5E7EB] bg-white">
              <td className="py-4 px-6 font-['Prata']"><h4>4BHK</h4></td>
              <td className="py-4 px-6 font-['Prata']"><h4>3535</h4></td>
              <td className="py-4 px-6">
                <button
                  onClick={handleUnlockPrice}
                  className="bg-[#C69C7B] text-white px-4 py-2 rounded hover:bg-[#94684B] transition-colors mx-auto block"
                >
                  <h4>Unlock Price</h4>
                </button>
              </td>
            </tr>
            <tr className="border-b border-[#E5E7EB] bg-white">
              <td className="py-4 px-6 font-['Prata']"><h4>4BHK</h4></td>
              <td className="py-4 px-6 font-['Prata']"><h4>3550</h4></td>
              <td className="py-4 px-6">
                <button
                  onClick={handleUnlockPrice}
                  className="bg-[#C69C7B] text-white px-4 py-2 rounded hover:bg-[#94684B] transition-colors mx-auto block"
                >
                  <h4>Unlock Price</h4>
                </button>
              </td>
            </tr>
            <tr className="border-b border-[#E5E7EB] bg-white">
              <td className="py-4 px-6 font-['Prata']"><h4>4BHK</h4></td>
              <td className="py-4 px-6 font-['Prata']"><h4>3950</h4></td>
              <td className="py-4 px-6">
                <button
                  onClick={handleUnlockPrice}
                  className="bg-[#C69C7B] text-white px-4 py-2 rounded hover:bg-[#94684B] transition-colors mx-auto block"
                >
                  <h4>Unlock Price</h4>
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PriceTable;