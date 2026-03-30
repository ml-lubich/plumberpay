import { ServiceType } from './types'

export const SERVICE_TYPES: ServiceType[] = [
  {
    id: 'drain-cleaning',
    name: 'Drain Cleaning',
    icon: '🔧',
    defaultItems: [
      { description: 'Drain snake / augering', unitPrice: 150 },
      { description: 'Hydro jetting', unitPrice: 350 },
      { description: 'Camera inspection', unitPrice: 125 },
      { description: 'Service call fee', unitPrice: 75 },
    ],
  },
  {
    id: 'pipe-repair',
    name: 'Pipe Repair',
    icon: '🔩',
    defaultItems: [
      { description: 'Pipe repair labor (per hour)', unitPrice: 125 },
      { description: 'Copper pipe materials', unitPrice: 85 },
      { description: 'PVC pipe materials', unitPrice: 45 },
      { description: 'Pipe fitting / connectors', unitPrice: 35 },
      { description: 'Emergency service surcharge', unitPrice: 100 },
    ],
  },
  {
    id: 'water-heater',
    name: 'Water Heater',
    icon: '🔥',
    defaultItems: [
      { description: 'Water heater installation labor', unitPrice: 350 },
      { description: 'Tank water heater (40 gal)', unitPrice: 650 },
      { description: 'Tank water heater (50 gal)', unitPrice: 800 },
      { description: 'Tankless water heater unit', unitPrice: 1200 },
      { description: 'Water heater repair / service', unitPrice: 200 },
      { description: 'Anode rod replacement', unitPrice: 125 },
    ],
  },
  {
    id: 'bathroom-remodel',
    name: 'Bathroom Remodel',
    icon: '🚿',
    defaultItems: [
      { description: 'Rough-in plumbing labor', unitPrice: 500 },
      { description: 'Fixture installation (each)', unitPrice: 175 },
      { description: 'Toilet installation', unitPrice: 250 },
      { description: 'Shower valve installation', unitPrice: 300 },
      { description: 'Bathtub installation', unitPrice: 450 },
    ],
  },
  {
    id: 'faucet-fixture',
    name: 'Faucet & Fixtures',
    icon: '🚰',
    defaultItems: [
      { description: 'Faucet installation', unitPrice: 150 },
      { description: 'Garbage disposal install', unitPrice: 200 },
      { description: 'Toilet repair', unitPrice: 125 },
      { description: 'Shut-off valve replacement', unitPrice: 100 },
    ],
  },
  {
    id: 'sewer',
    name: 'Sewer Line',
    icon: '🏗️',
    defaultItems: [
      { description: 'Sewer line inspection', unitPrice: 250 },
      { description: 'Sewer line repair (per foot)', unitPrice: 150 },
      { description: 'Sewer cleanout installation', unitPrice: 400 },
      { description: 'Trenchless sewer repair', unitPrice: 3000 },
    ],
  },
  {
    id: 'emergency',
    name: 'Emergency',
    icon: '🚨',
    defaultItems: [
      { description: 'Emergency service call', unitPrice: 200 },
      { description: 'After-hours labor (per hour)', unitPrice: 175 },
      { description: 'Water shut-off / leak stop', unitPrice: 150 },
      { description: 'Burst pipe repair', unitPrice: 400 },
    ],
  },
  {
    id: 'other',
    name: 'Other',
    icon: '📋',
    defaultItems: [
      { description: 'Labor (per hour)', unitPrice: 100 },
      { description: 'Materials', unitPrice: 50 },
      { description: 'Service call fee', unitPrice: 75 },
    ],
  },
]

export const TAX_RATE = 0.08
