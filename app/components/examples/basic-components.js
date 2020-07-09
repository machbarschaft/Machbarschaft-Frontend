import React from 'react';
import {
  Menu,
  Space,
  Button, Tooltip,
  Typography,
  Row, Col,
  Divider,
  Steps, message,
  Avatar,
  Collapse,
  Card,
  Descriptions,
  Popover,
  Modal,
  Spin,
  Skeleton,
  Checkbox,
  InputNumber, Input, Radio, Switch, Select, Upload,
} from 'antd';
import {
  SearchOutlined, InfoCircleOutlined, UserOutlined, LoadingOutlined, UploadOutlined,
} from '@ant-design/icons';

const {
  Link, Title, Text, Paragraph,
} = Typography;

// Basic Layout
function BasicComponentsExampleGrid() {
  return (
    <>
      <Row gutter={24}>
        <Col className="gutter-row" span={5}>
          <div style={{ background: '#0092ff', color: 'white' }}>col-1</div>
        </Col>
        <Col className="gutter-row" span={5}>
          <div style={{ background: '#0092ff', color: 'white' }}>col-2</div>
        </Col>
        <Col className="gutter-row" span={5}>
          <div style={{ background: '#0092ff', color: 'white' }}>col-3</div>
        </Col>
        <Col className="gutter-row" span={5}>
          <div style={{ background: '#0092ff', color: 'white' }}>col-4</div>
        </Col>
      </Row>
      CSS3 Grid might be a good alternative, especially for being responsive
      (
      <a href="https://css-tricks.com/snippets/css/complete-guide-grid/" target="_blank">More information on CSS Grid</a>
      )!
    </>
  );
}
function BasicComponentsExampleSpace() {
  return (
    <Space direction="vertical">
      <Space size="small">
        space small:
        <Button type="primary">Button 1</Button>
        <Button type="primary">Button 2</Button>
        <Button type="primary">Button 3</Button>
      </Space>
      <Space size="middle">
        space middle:
        <Button type="primary">Button 1</Button>
        <Button type="primary">Button 2</Button>
        <Button type="primary">Button 3</Button>
      </Space>
      <Space size="large">
        space large:
        <Button type="primary">Button 1</Button>
        <Button type="primary">Button 2</Button>
        <Button type="primary">Button 3</Button>
      </Space>
      <Space size={80}>
        space custom value:
        <Button type="primary">Button 1</Button>
        <Button type="primary">Button 2</Button>
        <Button type="primary">Button 3</Button>
      </Space>
      And all lines are vertically spaced.
    </Space>
  );
}
function BasicComponentsExampleTypography() {
  return (
    <>
      <Title>Title 1</Title>
      <Title level={2}>Title 2</Title>
      <Title level={3}>Title 3</Title>
      <Title level={4}>Title 4</Title>
      <Space size="large">
        <Text>Text</Text>
        <Text type="secondary">Secondary Text</Text>
        <Text type="warning">Warning Text</Text>
        <Text type="danger">Danger Text</Text>
        <Text disabled>Disabled Text</Text>
        <Text mark>Marked Text</Text>
        <Text code>Code</Text>
        <Text underline>Underlined Text</Text>
        <Text delete>Deleted Text</Text>
        <Text strong>Bold Text</Text>
      </Space>
      <br />
      <br />
      <Paragraph copyable>This is a copyable text.</Paragraph>
      <Paragraph copyable={{ text: 'Hello, Ant Design!' }}>Replace copy text.</Paragraph>
      <div style={{ width: '50em' }}>
        Cut Text:
        <Paragraph ellipsis>
          Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
          Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
          a design language for background applications, is refined by Ant UED Team. Ant Design, a
          design language for background applications, is refined by Ant UED Team. Ant Design, a design
          language for background applications, is refined by Ant UED Team. Ant Design, a design
          language for background applications, is refined by Ant UED Team.
        </Paragraph>
        Expandable text:
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
          Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
          Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
          a design language for background applications, is refined by Ant UED Team. Ant Design, a
          design language for background applications, is refined by Ant UED Team. Ant Design, a design
          language for background applications, is refined by Ant UED Team. Ant Design, a design
          language for background applications, is refined by Ant UED Team.
        </Paragraph>
      </div>
    </>
  );
}

// Visual Components
function BasicComponentsExampleIcon() {
  return (
    <>
      Example:
      {' '}
      <InfoCircleOutlined style={{ fontSize: '2em' }} />
      <br />
      More icons:
      {' '}
      <a href="https://ant.design/components/icon/" target="_blank">ant.design/components/icon/</a>
    </>
  );
}
function BasicComponentsExampleDivider() {
  return (
    <>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
        probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
        probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <Divider plain>Text inside divider</Divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
        probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      Vertical
      {' '}
      <Divider type="vertical" />
      {' '}
      Divider
    </>
  );
}

const { Step } = Steps;
function BasicComponentsExampleSteps() {
  const [state, setState] = React.useState(0);
  const steps = [
    {
      title: 'First',
      content: 'First-content',
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Steps current={state}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[state].content}</div>
      <div className="steps-action">
        {state < steps.length - 1 && (
        <Button type="primary" onClick={() => setState((curState) => curState + 1)}>Next</Button>
        )}
        {state === steps.length - 1 && (
        <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
        )}
        {state > 0 && (
        <Button style={{ margin: '0 8px' }} onClick={() => setState((curState) => curState - 1)}>Previous</Button>
        )}
      </div>
    </Space>
  );
}
function BasicComponentsExampleAvatar() {
  return (
    <>
      <Avatar shape="square" icon={<UserOutlined />} />
      <Avatar icon={<UserOutlined />} />
      <Avatar>U</Avatar>
      <Avatar size={40}>USER</Avatar>
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
      <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
    </>
  );
}

const { Panel } = Collapse;
function BasicComponentsExampleCollapse() {
  return (
    <>
      Multiple panels can be open and first is opened:
      <Collapse defaultActiveKey={['1']}>
        <Panel header="This is panel header 1" key="1">
          <p>Text 1</p>
        </Panel>
        <Panel header="This is panel header 2" key="2">
          <p>Text 2</p>
        </Panel>
        <Panel header="This is panel header 3" key="3">
          <p>Text 3</p>
        </Panel>
      </Collapse>
      <br />
      <br />
      Only one panel can be opened at the same time, third panel is disabled:
      <Collapse accordion>
        <Panel header="This is panel header 1" key="1">
          <p>Text 1</p>
        </Panel>
        <Panel header="This is panel header 2" key="2">
          <p>Text 2</p>
        </Panel>
        <Panel header="This is panel header 3" key="3" disabled>
          <p>Text 3</p>
        </Panel>
      </Collapse>
    </>
  );
}
function BasicComponentsExampleCard() {
  return (
    <div style={{ background: '#ececec', padding: '30px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={false} extra={<a href="#">More</a>}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
}
function BasicComponentsExampleDescriptions() {
  return (
    <>
      <Descriptions title="User Info">
        <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label="Remark">empty</Descriptions.Item>
        <Descriptions.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="User Info" bordered>
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
        <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
        <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
        <Descriptions.Item label="Usage Time" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
          Running
        </Descriptions.Item>
        <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
        <Descriptions.Item label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}
function BasicComponentsExamplePopover() {
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  return (
    <Space style={{ marginLeft: '5em' }}>
      <Popover content={content} title="Title">
        <Button type="primary">Hover me (top)</Button>
      </Popover>
      <Popover content={content} placement="bottom" title="Title">
        <Button type="primary">Hover me (bottom)</Button>
      </Popover>
      <Popover content={content} placement="left" title="Title">
        <Button type="primary">Hover me (left)</Button>
      </Popover>
      <Popover content={content} placement="right" title="Title">
        <Button type="primary">Hover me (right)</Button>
      </Popover>
    </Space>
  );
}
function BasicComponentsExampleTooltip() {
  return (
    <Space style={{ marginLeft: '5em' }}>
      <Tooltip title="This is a helping text">
        <Button type="primary">Hover me (top)</Button>
      </Tooltip>
      <Tooltip placement="bottom" title="This is a helping text">
        <Button type="primary">Hover me (bottom)</Button>
      </Tooltip>
      <Tooltip placement="left" title="This is a helping text">
        <Button type="primary">Hover me (left)</Button>
      </Tooltip>
      <Tooltip placement="right" title="This is a helping text">
        <Button type="primary">Hover me (right)</Button>
      </Tooltip>
    </Space>
  );
}

function BasicComponentsExampleModal() {
  const [state, setState] = React.useState({ loading: false, visible: false });

  function info() {
    Modal.info({
      title: 'This is a notification message',
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {},
    });
  }
  function success() {
    Modal.success({
      content: 'some messages...some messages...',
    });
  }
  function error() {
    Modal.error({
      title: 'This is an error message',
      content: 'some messages...some messages...',
    });
  }
  function warning() {
    Modal.warning({
      title: 'This is a warning message',
      content: 'some messages...some messages...',
    });
  }

  function showModal() {
    setState({ ...state, visible: true });
  }
  function handleOk() {
    setState({ ...state, loading: true });
    setTimeout(() => setState({ loading: true, visible: false }), 3000);
  }
  function handleCancel() {
    setState({ ...state, visible: false });
  }

  return (
    <Space>
      <Button onClick={info}>Info</Button>
      <Button onClick={success}>Success</Button>
      <Button onClick={error}>Error</Button>
      <Button onClick={warning}>Warning</Button>

      <Button type="primary" onClick={showModal}>
        Delete
      </Button>
      <Modal
        visible={state.visible}
        title="Really delete this?"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Abort
          </Button>,
          <Button key="submit" type="primary" loading={state.loading} onClick={handleOk}>
            Delete
          </Button>,
        ]}
      >
        <p>The data will be lost permanently</p>
      </Modal>
    </Space>
  );
}
function BasicComponentsExampleMessage() {
  const key = 'updatable';

  function openMessage() {
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({ content: 'Loaded!', key, duration: 2 });
    }, 1000);
  }
  return (
    <Space>
      <Button type="primary" onClick={() => message.info('This is a normal message')}>Display normal message</Button>
      <Button type="primary" onClick={() => message.info('This is a normal message, 10s', 10)}>Display normal message for 10s</Button>
      <Button type="primary" onClick={() => message.info('This is a success message')}>Success</Button>
      <Button type="primary" onClick={() => message.info('This is an error message')}>Error</Button>
      <Button type="primary" onClick={() => message.info('This is a warning message')}>Warning</Button>
      <Button type="primary" onClick={openMessage}>Loading</Button>
    </Space>
  );
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
function BasicComponentsExampleSpin() {
  return (
    <>
      <Space size="middle">
        <Spin size="small" />
        <Spin />
        <Spin size="large" />
        <Spin tip="Loading..." />
        <Spin indicator={antIcon} />
      </Space>
      <br />
      <br />
      <Spin style={{ width: 300 }}>
        <Card title="Card title" style={{ width: 300, border: '1px solid black' }}>
          Loading inside card
        </Card>
      </Spin>
    </>
  );
}
function BasicComponentsExampleSkeleton() {
  return (
    <Skeleton />
  );
}

// Form elements
function BasicComponentsExampleButton() {
  const [state, setState] = React.useState(false);

  function enableLoading() {
    setState(true);
    setTimeout(() => setState(false), 4000);
  }
  return (
    <>
      <Space>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="link">Link Button</Button>
      </Space>
      <br />
      <br />
      <Space>
        <Button type="primary" shape="circle" icon={<SearchOutlined />} />
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
      </Space>
      <br />
      <br />
      <Space>
        <Button type="primary" size="large">Large</Button>
        <Button type="primary" size="default">Default</Button>
        <Button type="primary" size="small">Small</Button>
      </Space>
      <br />
      <br />
      <Button type="primary" loading={state} onClick={() => enableLoading()}>
        Click me!
      </Button>
    </>
  );
}
function BasicComponentsExampleCheckbox() {
  return (
    <Checkbox onChange={(e) => console.log(`checked = ${e.target.checked}`)}>Checkbox</Checkbox>
  );
}
function BasicComponentsExampleInputNumber() {
  return (
    <InputNumber min={1} max={10} defaultValue={3} />
  );
}

const { Search, TextArea } = Input;
function BasicComponentsExampleInput() {
  return (
    <Space direction="vertical">
      <Input placeholder="Basic usage" />
      <Search placeholder="input search text" onSearch={(value) => console.log(value)} style={{ width: 200 }} />
      <TextArea rows={4} />
    </Space>
  );
}
function BasicComponentsExampleRadio() {
  const [state, setState] = React.useState(1);

  return (
    <Space direction="vertical">
      <Radio.Group onChange={(e) => setState(e.target.value)} value={state}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
      <Radio.Group onChange={(e) => setState(e.target.value)} value={state}>
        <Radio.Button value={1}>A</Radio.Button>
        <Radio.Button value={2}>B</Radio.Button>
        <Radio.Button value={3}>C</Radio.Button>
        <Radio.Button value={4}>D</Radio.Button>
      </Radio.Group>
    </Space>
  );
}
function BasicComponentsExampleSwitch() {
  return (
    <Switch />
  );
}
const { Option } = Select;
function BasicComponentsExampleSelect() {
  return (
    <Select defaultValue="lucy" style={{ width: 120 }} onChange={(value) => console.log(`selected ${value}`)}>
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>Disabled</Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
  );
}
function BasicComponentsExampleUpload() {
  const props = {
    name: 'file',
    action: '',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Upload {...props}>
      <Button>
        <UploadOutlined />
        {' '}
        Click to Upload
      </Button>
    </Upload>
  );
}

export default function BasicComponentsExample() {
  const [state, setState] = React.useState('basic');

  const content = {
    basic:
  <>
    <Title level={3}>Space</Title>
    <BasicComponentsExampleSpace />
    <Title level={3}>Typography</Title>
    <BasicComponentsExampleTypography />
    <Title level={3}>Grid</Title>
    <BasicComponentsExampleGrid />
  </>,
    visual:
  <>
    <Title level={3}>Icon</Title>
    <BasicComponentsExampleIcon />
    <Title level={3}>Divider</Title>
    <BasicComponentsExampleDivider />
    <Title level={3}>Steps</Title>
    <BasicComponentsExampleSteps />
    <Title level={3}>Avatar</Title>
    <BasicComponentsExampleAvatar />
    <Title level={3}>Collapse</Title>
    <BasicComponentsExampleCollapse />
    <Title level={3}>Card</Title>
    <BasicComponentsExampleCard />
    <Title level={3}>Descriptions</Title>
    <BasicComponentsExampleDescriptions />
    <Title level={3}>Popover</Title>
    <BasicComponentsExamplePopover />
    <Title level={3}>Tooltip</Title>
    <BasicComponentsExampleTooltip />
    <Title level={3}>Modal</Title>
    <BasicComponentsExampleModal />
    <Title level={3}>Message</Title>
    <BasicComponentsExampleMessage />
    <Title level={3}>Spin</Title>
    <BasicComponentsExampleSpin />
    <Title level={3}>Skeleton</Title>
    <BasicComponentsExampleSkeleton />
  </>,
    form:
  <>
    <Title level={3}>Button</Title>
    <BasicComponentsExampleButton />
    <Title level={3}>Checkbox</Title>
    <BasicComponentsExampleCheckbox />
    <Title level={3}>InputNumber</Title>
    <BasicComponentsExampleInputNumber />
    <Title level={3}>Input</Title>
    <BasicComponentsExampleInput />
    <Title level={3}>Radio</Title>
    <BasicComponentsExampleRadio />
    <Title level={3}>Switch</Title>
    <BasicComponentsExampleSwitch />
    <Title level={3}>Select</Title>
    <BasicComponentsExampleSelect />
    <Title level={3}>Upload</Title>
    <BasicComponentsExampleUpload />
  </>,
  };
  function handleClick(e) {
    setState(e.key);
  }

  return (
    <div style={{ width: '90%' }}>
      <Menu onClick={handleClick} selectedKeys={[state]} mode="horizontal">
        <Menu.Item key="basic">Basic Components</Menu.Item>
        <Menu.Item key="visual">Visual Components</Menu.Item>
        <Menu.Item key="form">Form Elements</Menu.Item>
      </Menu>
      <br />
      <Space direction="vertical" size="large">{content[state]}</Space>

      <br />
      <br />
      <br />
      More information on:
      {' '}
      <a href="https://ant.design/components/overview/" target="_blank">ant.design/components/overview/</a>
      <br />
      <br />
      <br />
    </div>
  );
}
