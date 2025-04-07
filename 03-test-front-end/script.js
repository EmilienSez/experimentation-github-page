barDeProgression = document.getElementById("progress-bar");
pourcentageProgression = 90;
barDeProgression.className = `bg-[#a5b68d] text-xs font-medium text-gray-600 text-center p-0.5 leading-none rounded-full w-[${pourcentageProgression}%]`;
barDeProgression.textContent = `${pourcentageProgression} %`;

