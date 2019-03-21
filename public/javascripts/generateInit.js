function generateInit(path) {
  var form = document.createElement('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', path);

  const ports = ['A', 'B', 'C', 'D', 'E', 'F'];
  let initialize_data = [[], [], [], [], [], []];
  for (var i = 0; i < ports.length; i++) {
    let bit = 0;
    for (var j = 0; j < 16; j++) {
      const pin = 'P' + ports[i] + j.toString();
      const element = document.getElementById(pin);

      bit = parseInt(element.getAttribute('value'));
      if (bit != 2) {
        initialize_data[i].push([j, bit]);
      }
    }
  }
  let initialize_ports = [];
  let clock_bits_str = 0;
  for (var i = 0; i < initialize_data.length; i++) {
    if (initialize_data[i].length != 0) {
      clock_bits_str += 2**i;
      let specific_port_init = [String.fromCharCode(i+65), 0, 0, 0]; //port, inputs, outputs, digital
      for (var j = 0; j < initialize_data[i].length; j++) {
        if (initialize_data[i][j][1] == 1) {
          specific_port_init[2] += 2**initialize_data[i][j][0];
        } else {
          specific_port_init[1] += 2**initialize_data[i][j][0];
        }
      }
      specific_port_init[3] = specific_port_init[1] + specific_port_init[2];
      specific_port_init[1] = specific_port_init[1].toString(16);
      specific_port_init[2] = specific_port_init[2].toString(16);
      specific_port_init[3] = specific_port_init[3].toString(16);
      initialize_ports.push(specific_port_init);
    }
  }

  clock_bits_str = clock_bits_str.toString(16);

  let initialization_text = 'LDR R1, =SYSCTL_RCGCGPIO_R\n' +
                            'LDR R0, [R1]\n' +
                            'ORR R0, 0x' +
                            clock_bits_str + '\n' +
                            'STR R0, [R1]\n' +
                            'NOP\nNOP\n';
  for (var i = 0; i < initialize_ports.length; i++) {
    initialization_text += 'LDR R1, =GPIO_PORT' + initialize_ports[i][0] + '_DIR_R\n' +
                          'LDR R0, [R1]\n';
    if (parseInt(initialize_ports[i][1],16) != 0) {
      initialization_text += 'AND R0, 0x' + (parseInt('FFFFFFFF', 16) - parseInt(initialize_ports[i][1], 16)).toString(16) + '\n';
    }
    if (parseInt(initialize_ports[i][2],16) != 0) {
      initialization_text += 'ORR R0, 0x' + initialize_ports[i][2] + '\n';
    }
    initialization_text += 'STR R0, [R1]\nLDR R1, =GPIO_PORT' + initialize_ports[i][0] + '_DEN_R\n' +
                          'LDR R0, [R1]\n' +
                          'ORR R0, 0x' + initialize_ports[i][3] + '\n' +
                          'STR R0, [R1]\n';
  }





  var hiddenField = document.createElement('input');
  hiddenField.setAttribute('type', 'hidden');
  hiddenField.setAttribute('name', 'code');
  hiddenField.setAttribute('value', initialization_text);
  form.appendChild(hiddenField);
  document.body.appendChild(form);
  form.submit();
}
