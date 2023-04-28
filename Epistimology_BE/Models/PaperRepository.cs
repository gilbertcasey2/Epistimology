//using System;
//using System.Reflection;
//using System.Xml.Linq;

//namespace Epistimology_BE.Models
//{
//	public class PaperRepository : IPaperRepository
//	{
//        private List<PaperModel> papers = new List<PaperModel>();
//        private int _nextId = 1;
//        static readonly Models.IColumnRepository columnRepo = new Models.ColumnRepository();
//        private IEnumerable<Column> columns; 
//        public PaperRepository()
//		{
//            columns = columnRepo.GetAll();
//            PaperModel paper1 = Add(new PaperModel {
//                tags = new List<Tag>() {
//                    new Tag()
//                    {
//                        id = 0,
//                        name = "CFHP",
//                        color = "lightblue"
//                    },
//                    new Tag()
//                    {
//                        id = 1,
//                        name = "Other tag",
//                        color = "darkblue"
//                    }
//                }
//            });
//            IList<string> colList = ["COMMUNITYLM: Probing Partisan Worldviews from Language Models",
//                "Jiang, Hang, et al. \"CommunityLM: Probing Partisan Worldviews from Language Models.\" arXiv preprint arXiv:2209.07065 (2022).",
//                "Computational Social Science",
//                "We aim to make these communities more comprehensible to each other with a framework that probes community-specific responses to the same survey questions using community language models  (COMMUNITYLM). In our framework we identify committed partisan members for each  community on Twitter and fine-tune LMs on the tweets authored by them. We then assess the world views of the two groups using prompt-based probing of their corresponding LMs, with prompts that elicit opinions about public figures and groups surveyed by the  ANES) 2020 Exploratory Testing Survey.",
//                "- very good entry point for collecting sentiment from social media\n- talks about gauging political sentiment -> can we refactor the probes to gauge climate specifically?\n- instead of grouping by political affiliation, can we group by location?",
//                "ML, natural language processing, community sentiment", "hjian42"
//                ];
//            for (int i = 0; i < length(columnscolumns.size(); i++)
//            {
//                PaperColumn paperColumn = new PaperColumn(colList[i], paper1) {
//                    colList[]
//                }
//            }
//            Add(new PaperModel
//            {
//                title = "Advancing Participatory Democracy through Collaborative Data Platforms",
//                citation = "Thoneick, R., Degkwitz, T., & Lieven, C. (2021). Advancing Participatory Democracy through Collaborative Data Platforms. Raphael Schwegmann, Gesa Ziemer und Jörg Rainer Noennig (Hg.); Perspectives in Metropolitan Research. Digital City Science. Berlin: JOVIS Verlag, 93-105.",
//                discipline = "Urban Design,",
//                pAbstract = "This paper investigates the argument that facilitating open data for democratic processes requires a transformation of the underlying processes as well as a strong functional integration into participatory systems. The evolution from conventional planning to its digitisation is not solely a technological shift, but necessitates fundamental procedural changes. This requires broadening the scope in planning digitisation beyond the use of technical tools to include an analysis of the respective context.",
//                notes = "- Really interesting comments on participatory democracy and. how that needs to happen\n- talks about the three levels of democracy -> which will be helpful for me to reference: monitorial, deliberative, and participatory.\n- delves into the specifics of these digital platforms themselves",
//                keyConcepts = "participatory democracy, urban design and planning, engaged citizenry, NLP of aggregated participatory data",
//                interestRating = 7,
//                year = 2021,
//                authors = "Rosa Thoneick, HafenCity University",
//                tags = new List<Tag>() {
//                    new Tag()
//                    {
//                        id = 0,
//                        name = "CFHP",
//                        color = "purple"
//                    },
//                }
//            });
//            Add(new PaperModel
//            {
//                title = "Evaluating Cultural Impact in Discursive Space through Digital Footprints",
//                category = new Category(){ id=1, name="Sensor-Specific"},
//                citation = "López Baeza, Jesús, et al. \"Evaluating cultural impact in discursive space through digital footprints.\" Sustainability 13.7 (2021): 4043.",
//                discipline = "Urban Planning",
//                pAbstract = "The research presented in this paper describes an evaluation of the impact of spatial interventions in public spaces, measured by social media data. This contribution aims at observing the way a spatial intervention in an urban location can affect what people talk about on social media. textual data from the social networks Twitter and Instagram (i.e., tweets and image captions) are collected and analyzed using Natural Language Processing intelligence. These analyses identify and track the cultural topic or “people talking about culture” in the city of Hamburg. We observe the evolution of the cultural topic, and its potential correspondence in levels of activity, with certain intervention actions carried out in Domplatz.",
//                notes = "- Good analysis on using SM to crowd source data on more nebulous things like culture in a city \n- probably relevant to reference for studying climate sentiment\n- detailed process\n- also philosophical\n- very interesting ",
//                keyConcepts = "Urban planning, Urban Design, Social Media analysis, NLP, topic clustering",
//                interestRating = 7,
//                year = 2021,
//                keyWords = "smart culture; smart city; digital culture; NLP; Twitter; social media; social networks"
//            });

//        }

//        public IEnumerable<PaperModel> GetAll()
//        {
//            return papers;
//        }

//        public PaperModel Add(PaperModel paper)
//        {
//            if (paper == null)
//            {
//                throw new ArgumentNullException("item");
//            }
//            paper.id = _nextId++;
//            papers.Add(paper);
//            return paper;
//        }

//        public PaperModel UpdatePaper(PaperModel paper)
//        {
//            if (paper == null || paper.id == 0)
//            {
//                throw new ArgumentNullException("item");
//            }

//            PaperModel paperToUpdate = papers.Where(c => c.id == paper.id).First();
//            PropertyInfo[] properties = paper.GetType().GetProperties();
//            foreach (PropertyInfo prop in properties)
//            {
//                var newVal = prop.GetValue(paper);
//                if(newVal != null)
//                {
//                    prop.SetValue(paperToUpdate, newVal);
//                }
               
//            }
//            return paperToUpdate;

//        }
//    }
//}

