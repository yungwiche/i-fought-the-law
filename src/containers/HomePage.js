import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dotdotdot from 'react-clamp'

import SearchBar from '../components/SearchBar';
import {
  Advertisement,
  Card,
  Container,
  Grid,
  Segment,
  Image,
  Label,
  Loader,
  Header,
  Menu,
  Table
} from 'semantic-ui-react';
import MediaParagraphPNG from '../assets/images/media-paragraph.png';
import ParagraphPNG from '../assets/images/paragraph.png';
import * as actions from '../store/actions/index';
import FooterLayout from '../components/FooterLayout';

class HomePage extends Component {

  pageIndex = 1;
  itemPerPage = 10;

  componentDidMount() {
    this.props.onGetAllNews();
    this.props.onGetChapterList();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.chapters !== this.props.chapters) {
      nextProps.onGetChapterDetail(nextProps.chapters[0], this.pageIndex, this.itemPerPage);
    }
  }

  handleChapterSelect(e, { id, chapter }) {
    this.props.onGetChapterDetail(chapter, this.pageIndex, this.itemPerPage);
    console.log(chapter);
  }

  handlePageSelect(e, { name }) {
    console.log(name);
    console.log(this.props.news);
  }

  render() {
    const chapterList = this.props.chapters.map(chapter => (
      <Menu.Item id={chapter.id} chapter={chapter}
        onClick={this.handleChapterSelect.bind(this)}>Chương {chapter.order} : {chapter.title}</Menu.Item>
    ));

    const articleList = this.props.articles.map(article => (
      <Table.Row id={article.id}>
        <Table.Cell><Dotdotdot clamp={3}>{article.order}</Dotdotdot></Table.Cell>
        <Table.Cell><Dotdotdot clamp={3}>{article.title}</Dotdotdot></Table.Cell>
        <Table.Cell><Dotdotdot clamp={3}>{article.content}</Dotdotdot></Table.Cell>
      </Table.Row>
    ));

    const loader = <Loader />;
    return (
      <div className="Body">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={11}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <SearchBar
                        keyword={this.props.keyword}
                        handleSearchSubmit={this.props.handleSearchSubmit}
                        onCategoryChange={this.props.onCategoryChange}
                        category={this.props.category}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column className='NewsColumn'>
                      <Segment className="NewsSegment" basic>
                        <Header as='h3'>TEST</Header>
                        {this.props.isNewsLoading == false && 
                          <Image size = 'small' src={this.props.news.data[0].image} />
                        }
                        {this.props.isNewsLoading == true && 
                          <Image src={ParagraphPNG} />
                        }
                      </Segment>
                      <Segment className="NewsSegment" basic>
                        <Image src={ParagraphPNG} />
                      </Segment>
                    </Grid.Column>
                    <Grid.Column className='NewsColumn'>
                      <Grid.Row>
                        <Segment className="NewsSegment" basic>
                          <Header as='h3'>TEST</Header>
                          <Image size='medium' src={MediaParagraphPNG} />
                        </Segment>
                      </Grid.Row>
                      <Grid.Row>
                        <Segment className="NewsSegment" basic>
                          <Image size='medium' src={MediaParagraphPNG} />
                        </Segment>
                      </Grid.Row>
                      <Grid.Row>
                        <Segment className="NewsSegment" basic>
                          <Image size='medium' src={MediaParagraphPNG} />
                        </Segment>
                      </Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column width={5}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Card fluid>
                        <Card.Header textAlign='center' className='BlockHeader'>
                          <Label color='blue' size='big'>TEST</Label>
                        </Card.Header>
                        <Card.Content>
                          <Image src={ParagraphPNG} />
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Card fluid>
                        <Card.Header textAlign='center' className='BlockHeader'>
                          <Label color='blue' size='big'>TEST</Label>
                        </Card.Header>
                        <Card.Content>
                          <Image src={ParagraphPNG} />
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Advertisement centered unit='top banner' test='Top Banner' />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={4}>
                <Card fluid>
                  <Card.Header textAlign='center' className='BlockHeader'>
                    <Label color='blue' size='big'>CHƯƠNG TRA CỨU</Label>
                  </Card.Header>
                  <Card.Content className='BlockContent'>
                    <Menu style={{
                      'border': '0'
                    }} fluid vertical>
                      {this.props.isChapterListLoading ? loader : chapterList}
                    </Menu>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={7}>
                <Card fluid>
                  <Card.Header textAlign='center' className='BlockHeader'>
                    <Label color='blue' size='big'>DANH SÁCH ĐIỀU LUẬT</Label>
                  </Card.Header>
                  <Card.Content className='BlockContent'>
                    <Table style={{
                      'border': '0',
                    }} striped>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell width={2}>STT</Table.HeaderCell>
                          <Table.HeaderCell width={5}>Tên</Table.HeaderCell>
                          <Table.HeaderCell width={9}>Nội dung</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {this.props.isChapterDetailLoading ? loader : articleList}
                      </Table.Body>
                    </Table>
                  </Card.Content>
                </Card>
                <Menu floated='right' pagination>
                  <Menu.Item name='1' onClick={this.handlePageSelect.bind(this)} />
                  <Menu.Item disabled>...</Menu.Item>
                  <Menu.Item name='10' onClick={this.handlePageSelect.bind(this)} />
                  <Menu.Item name='11' onClick={this.handlePageSelect.bind(this)} />
                  <Menu.Item name='12' onClick={this.handlePageSelect.bind(this)} />
                </Menu>
              </Grid.Column>
              <Grid.Column width={5}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Card fluid>
                        <Card.Header textAlign='center' className='BlockHeader'>
                          <Label color='blue' size='big'>TEST</Label>
                        </Card.Header>
                        <Card.Content>
                          <Image src={ParagraphPNG} />
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Card fluid>
                        <Card.Header textAlign='center' className='BlockHeader'>
                          <Label color='blue' size='big'>TEST</Label>
                        </Card.Header>
                        <Card.Content>
                          <Image src={ParagraphPNG} />
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <FooterLayout />
      </div>);
  }
}

const mapStateToProps = state => {
  return {
    chapters: state.laws.chapters,
    isChapterListLoading: state.laws.listLoading,
    articles: state.laws.articles,
    isChapterDetailLoading: state.laws.detailLoading,
    news: state.news.news,
    isNewsLoading: state.news.newsLoading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAllNews: () => dispatch(actions.getAllNews()),
    onGetChapterList: () => dispatch(actions.getChapterList()),
    onGetChapterDetail: (currentChapter, pageIndex, itemPerPage) => dispatch(actions.getChapterDetail(currentChapter, pageIndex, itemPerPage))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
