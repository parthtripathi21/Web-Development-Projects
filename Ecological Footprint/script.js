document.getElementById("footprint-form").addEventListener("submit",function(e){e.preventDefault();const carKm=parseFloat(this.elements.car_km.value)||0;const shortFlights=parseInt(this.elements.short_flights.value)||0;const electricity=parseFloat(this.elements.electricity.value)||0;const gas=parseFloat(this.elements.gas.value)||0;const diet=this.elements.diet.value;const recycle=this.elements.recycle.value;console.log({carKm,shortFlights,electricity,gas,diet,recycle});let footprint=0;footprint+=carKm*0.02;footprint+=shortFlights*0.5;footprint+=electricity*0.005;footprint+=gas*0.01;if(diet==="vegan")footprint+=0.5;else if(diet==="vegetarian")footprint+=1.0;else if(diet==="omnivore")footprint+=2.0;if(recycle==="yes")footprint-=0.5;footprint=Math.max(0,footprint);const resultDiv=document.getElementById("result");resultDiv.innerHTML=`
      <h2>Your Ecological Footprint</h2>
      <p><strong>${footprint.toFixed(2)} global hectares</strong></p>
      <p>Average global target per person is around <strong>1.7 gha</strong>.</p>
      ${
        footprint > 1.7
          ? "<p style='color: red;'>Your footprint is above the sustainable level. Consider making eco-friendly changes!</p>"
          : "<p style='color: green;'>You're living within a sustainable ecological footprint. Great job!</p>"
      }
    `})