import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../../../node_modules/react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { userslist } from "../../../actions/user";
import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import moment from 'moment'

const Users = ({ users }) => {


const getAllUsers = () => {

  return users.users.map(item => {
    const date = new Date(item.createdAt)
    console.log()
    return <>
    <Tr>
      <Td>{item.name}</Td>
      <Td>{item.username}</Td>
      <Td>{item.role}</Td>
      <Td>{moment(date).format('LLLL')}</Td>
    </Tr>
           </>
  })
}

    return <Layout>
        <Admin>
          <div className='container table-container'>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>username</Th>
                <Th>Role</Th>
                <Th>Created at</Th>
              </Tr>
            </Thead>
            <Tbody>
            {getAllUsers()}
            </Tbody>
        </Table>
          </div>
         <style global jsx>{`
                             table {
                   font-family: arial, sans-serif;
                   border-collapse: collapse;
                   width:100%;

                  }
                  th{
                   background-color: #b39ddb
                  }
                  td, th {
                   border: 1px solid #ede7f6;
                   text-align: left;
                   padding: 8px;
                  }

                  tr:nth-child(even) {
                   background-color: #ede7f6;
                  }

                  .table-container{
                   min-height: 80vh;
                  }
           `}</style>
               </Admin>
             </Layout>
}

Users.getInitialProps = () => {
  return userslist().then(data => {
      if (data.error) {
          console.log(data.error);
      } else {
          return { users: data };
      }
  });

};

export default Users;
