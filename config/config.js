const fields = {
  transaction_type: {
    type: "select",
    placeholder: "select transaction type",
    values: ["DELETE", "NEW", "NOUPDATE", "UPDATE", "NULL"],
  },
  height: {
    type: "select",
    placeholder: "select height",
    values: [
      "25",
      "30",
      "35",
      "40",
      "45",
      "50",
      "55",
      "65",
      "60",
      "65",
      "70",
      "75",
      "80",
      "85",
      "90",
      "95",
      "100",
      "N/A",
    ],
  },
  class: {
    type: "select",
    placeholder: "select class",
    values: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "N/A",
    ],
  },
  material: {
    type: "select",
    placeholder: "select material",
    values: ["Wood", "Fiberglass", "Metal", "Concrete", "Composite", "Other"],
    defaultValue: "Wood",
  },
  owner: {
    type: "input",
    placeholder: "owner by field audit",
  },
  ownership_descripency: {
    type: "select",
    placeholder: "Ownership Discrepancy/Conflicts (Y/N)",
    values: ["yes", "no"],
  },
  vendor_tag: {
    type: "input",
    placeholder: "Vendor Tag (Inspections)",
  },
  other_utility: {
    type: "input",
    placeholder: "Other Utility Pole Tag/Brand Number",
  },
  telco_cable: {
    placeholder: "Throughbolt attachment on a pole",
    type: "select",
    values: ["yes", "no"],
  },
  telco_drop: {
    type: "select",
    placeholder: "Telco Drop",
    values: ["yes", "no"],
  },
  telco_wireless: {
    type: "select",
    values: ["yes", "no"],
    placeholder: "Telco Wireless",
  },
  telco_dead_drop: {
    type: "select",
    values: ["yes", "no"],
    placeholder: "Telco Dead Drop",
  },
  telco_test_can: {
    placeholder: "Drop wire testing point",
    type: "select",
    values: ["yes", "no"],
  },
  telco_pedestal: {
    placeholder: "When bolted to pole",
    type: "select",
    values: ["yes", "no"],
  },
  accessible: {
    placeholder: "Accessible",
    type: "select",
    values: ["yes", "no"],
  },
  hard_surface: {
    type: "select",
    placeholder: "Hard surface",
    values: ["ASPHALT", "CONCRETE", "NONE", "ROCK"],
  },
  step: {
    placeholder: "Step",
    type: "select",
    values: ["yes", "no"],
  },
  balcony: {
    placeholder: "Balcony",
    type: "select",
    values: ["yes", "no"],
  },
  pole_mount_terminals: {
    placeholder: "Pole Mount Terminals",
    type: "select",
    values: ["yes", "no"],
  },
  power_transformer: {
    placeholder: "Power Transformer",
    type: "select",
    values: ["yes", "no"],
  },
  power_on_pole: {
    placeholder: "Power on Pole",
    type: "select",
    values: ["yes", "no"],
  },
  atnt_double_wood: {
    placeholder: "AT&T Double Wood/Transfers needed?",
    type: "select",
    values: ["yes", "no"],
  },
  double_wood_3rd_party: {
    placeholder: "Double Wood/3rd Party preventing AT&T Transfer?",
    type: "select",
    values: ["yes", "no"],
  },
  owner_descripency_transfer: {
    placeholder: "Ownership discrepancy due to transfer?",
    type: "select",
    values: ["yes", "no"],
  },
  transfers_comppleted: {
    placeholder: "Transfers completed, stub needs pulled",
    type: "select",
    values: ["yes", "no"],
  },
  cause_of_damage: {
    type: "select",
    placeholder: "select Cause Of Damage",
    values: [
      "Animal/insect",
      "Contractor Performing Work for AT&t",
      "Contractor Performing Work for Others",
      "Fire Natural",
      "Manufacturer Defect",
      "Other",
      "Vandalism/Arson",
      "Vehicle",
      "Weather",
    ],
  },
  bad_plant_condition: {
    type: "select",
    placeholder: "select Bad Plant Condition",
    values: [
      "Deteriorated Pole",
      "Balcony Seat",
      "Damaged Cable Section",
      "Broken Down-Guy/ Anchor",
      "Def or Damaged Splice and or Terminal",
    ],
  },
  service_prioriy: {
    type: "select",
    placeholder: "Bad Plant Service Priority",
    values: ["Non-Service Affecting", "Service Affecting", "Hazardous"],
  },
  comments: {
    type: "input",
    placeholder: "Comments",
  },
  vendor_name: {
    type: "input",
    placeholder: "Vendor Name",
  },
  pole_owner_not_in_list: {
    type: "input",
    placeholder: "Pole Owner Not In List",
  },
  copper_only: {
    placeholder: "Copper Only",
    type: "select",
    values: ["yes", "no"],
  },
  fiber_only: {
    placeholder: "Fiber Only",
    type: "select",
    values: ["yes", "no"],
  },
  copper_and_fiber: {
    placeholder: "Copper and Fiber(seperate strand)",
    type: "select",
    values: ["yes", "no"],
  },
  copper_and_fiber_overlashed: {
    placeholder: "Copper and Fiber, overlashed",
    type: "select",
    values: ["yes", "no"],
  },
  fiber_drop: {
    placeholder: "Fiber Drop",
    type: "select",
    values: ["yes", "no"],
  },
  copper_drop: {
    placeholder: "Copper Drop",
    type: "select",
    values: ["yes", "no"],
  },
};

const attacher = {
  attacher: {
    type: "select",
    values: [
      "Cable",
      "Cross Arm",
      "Cross Connected Box",
      "Neutral",
      "Pedestal",
      "Primary",
      "Secondary",
      "Service Wire",
      "Stand Off",
      "Terminal",
      "Test Can",
      "Transformer",
      "Wireless Attachment",
    ],
    placeholder: "Name of attaching company",
  },
  attacher_cable: {
    type: "input",
    placeholder: "Height of Cable",
  },
  attacher_droponly: {
    type: "input",
    placeholder: "Height of Service Drops",
  },
  seq: {
    type: "input",
    placeholder: "Order from the top of the pole down",
  },
  party_tag: {
    type: "input",
    placeholder: "Pole Attaching Party Tag Number",
  },
  bad_plant_condition: {
    type: "input",
    placeholder: "Bad Plant Condition",
  },
  attacher_not_in_list: {
    type: "input",
    placeholder: "Attacher Not In List",
  },
};

const downguys = {
  "direction": {
      "type": "select",
      "placeholder": "Direction",
      "values": [
          "E",
          "W",
          "N",
          "S",
          "NE",
          "NW",
          "SE",
          "SW"
      ],
      "defaultValue": "E"
  },
  "size": {
      "type": "input",
      "placeholder": "Size"
  },
  "type": {
      "type": "select",
      "placeholder": "Type",
      "values": [
          "Power",
          "Communication"
      ]
  },
  "note": {
      "type": "input",
      "placeholder": "Note"
  },
  "rodsize": {
      "type": "input",
      "placeholder": "Rod Size"
  }
}

module.exports = {
  fields,
  attacher,
  downguys
};
